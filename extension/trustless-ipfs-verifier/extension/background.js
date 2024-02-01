import { createHelia } from 'https://esm.sh/helia@next'
import { trustlessGateway } from 'https://esm.sh/helia@next/block-brokers'
import { unixfs } from 'https://esm.sh/@helia/unixfs@latest'
import { CID } from 'https://esm.sh/multiformats@latest'
import debug from 'https://esm.sh/debug@latest'

const integrityFailedUrl = chrome.runtime.getURL('integrity-failed.html')
const fleekIPFS = 'bafybeic5242ao473gu35azmjvkd54ikimzbvy6f34vki4l22nxpy6ngm6m'
let isIntercepting = false
let intercepted = false
function b64DecodeUnicode (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

debug.enable('*trustless-gateway*,helia:trustless-gateway-block-broker:trace')

const helia = await createHelia({
  blockBrokers: [
    trustlessGateway()
  ],
  libp2p: {
    start: false,
  }
})
const hFs = unixfs(helia)

async function getCID(cidString) {
  const cid = CID.parse(cidString)
  for await (const content of hFs.cat(cid)) {
    console.log(content);
  }
}

const getSha256Hash = async input => {
  const textAsBuffer = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray
    .map(item => item.toString(16).padStart(2, '0'))
    .join('')
  return hash
}

const disableDnrBlock = async () =>
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [],
    removeRuleIds: [1]
  })

const enableDnrBlock = async () =>
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: { type: 'block' },
        condition: {
          urlFilter: 'https://fleek.xyz/*',
          resourceTypes: ['main_frame']
        }
      }
    ]
  })

const handleRequestIntercepted = async (debuggeeId, message, params) => {
  const tabId = debuggeeId.tabId
  // Check the response integrity of the server before sending it to the user
  if (message === 'Fetch.requestPaused') {
    const response = await chrome.debugger.sendCommand(
      debuggeeId,
      'Fetch.getResponseBody',
      {
        requestId: params.requestId
      }
    )
    const decoded = response.base64Encoded
      ? b64DecodeUnicode(response.body)
      : response.body
    const hashed = await getSha256Hash(decoded)

    const fleekResponse = await fetch('https://ipfs.io/ipfs/' + fleekIPFS).then(
      response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status)
        }
        return response.text()
      }
    )
    const integrityHash = await getSha256Hash(fleekResponse)
    getCID(fleekIPFS);
    // This listener needs to be removed as a new debugger handler will be set up on the next request
    await chrome.debugger.onEvent.removeListener(handleRequestIntercepted)

    // If integrity fails, fail the request and redirect user to a safe page
    const integrityPassed = hashed === integrityHash

    if (!integrityPassed) {
      await chrome.debugger.sendCommand(debuggeeId, 'Fetch.failRequest', {
        requestId: params.requestId,
        errorReason: 'BlockedByClient'
      })

      // Re-block server so that future requests are re-verified
      await enableDnrBlock()
      await chrome.debugger.detach({ tabId })
      isIntercepting = false
      return chrome.tabs.update(tabId, { url: integrityFailedUrl })
    }

    // If integrity passes, continue the request
    await chrome.debugger.sendCommand(debuggeeId, 'Fetch.continueRequest', {
      requestId: params.requestId
    })

    // Re-block server so that future requests are re-verified
    await enableDnrBlock()
    await chrome.debugger.detach({ tabId })
    intercepted = true
    isIntercepting = false
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  // Ensure requests to the server are automatically blocked by DNR
  await enableDnrBlock()
})

// When the request is blocked by DNR, intercept it here
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Don't intercept while we're already intercepting
  if (isIntercepting) return

  // Only intercept the server we're interested in verifying
  if (
    !(tab.url.includes('https://fleek.xyz') && changeInfo.status === 'loading')
  )
    return

  // Attach a debugger to the tab in order to intercept the next request we make to the server
  await chrome.debugger.attach({ tabId }, '1.3')
  await chrome.debugger.sendCommand({ tabId }, 'Fetch.enable', {
    patterns: [{ urlPattern: 'https://fleek.xyz/', requestStage: 'Response' }]
  })

  chrome.debugger.onEvent.addListener(handleRequestIntercepted)

  // Now we have our debugger set up to intercept the request, re-trigger the request
  await disableDnrBlock()
  isIntercepting = true
  if (!intercepted) await chrome.tabs.reload(tabId)
})
