//import { initPrisma, prisma } from './util/prismaHelper.js';

const mapping = {
  'fleek.xyz': 'bafybeidtfkjek5emzjrzw6c4vtgwkfggfgpfdniamq4g4stqasknhxwpea',
  'ipfs.tech': 'bafybeibwirqleiponhf7v76j7uwl2ffpw7tjebmbyhxbfkw3etj5a6okjm',
  'docs.ipfs.tech': 'bafybeiebkh7kbsyofwlat7c6klayu57mmpy6362dso7egunokp7t3ary6u'
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  let url = new URL(tab.url);
  if (changeInfo.status != "complete") return;
  if (url.protocol == "ipfs://") return;
  
  console.log(url.hostname);
  
  if(mapping[url.hostname] !== undefined) {
    chrome.notifications.create(mapping[url.hostname], {
      type: 'basic',
      iconUrl: './images/icon-16.png',
      title: 'This domain is associated with an NFA.',
      message: 'Click here to open the safe version!',
      priority: 2,
    });
  }


  // initPrisma();

  // let urlLookup = prisma.tokens.findMany({
  //   where: {
  //     domain: url.hostname.replace('www', '')
  //   }
  // });

  // if (urlLookup.length > 0) {
  //   chrome.notifications.create('notificationID', {
  //     type: 'basic',
  //     iconUrl: './images/icon-16.png',
  //     title: 'This domain is associated with an NFA.',
  //     message: 'Do you want to open the safe version?',
  //     priority: 2,
  //     buttons: [{
  //       title: "Yes",
  //       // iconUrl: "./images/icon-16.png"
  //     }]
  //   });
  // }
});

chrome.notifications.onClicked.addListener((notificationID) => {

  chrome.tabs.create({
    url: 'https://ipfs.io/ipfs/'+notificationID,
    selected: true,
  })

  // if (notifId === myNotificationID) {
  //   if (btnIdx === 0) {
  //     window.open("...");
  //   } else if (btnIdx === 1) {
  //     saySorry();
  //   }
  // }
});

// We may not need the `onActivated` listener as any URL change will trigger the `onUpdated` listener.
// chrome.tabs.onActivated.addListener(() => {
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     var currentURL = tabs[0].url;
//     console.log("onActivated:" + currentURL);
//   })
// });