# Trustless IPFS Verifier Extension

This extension aims to identify the correct content for NFA websites by fetching the IPFS CID from a trustless node and comparing its hash against the loaded browser body data.

## How it works

By utilizing manifestV3's DNR, the extension inspects all requests made to NFA websites. Subsequently, it fetches their latest IPFS CID from a gateway and compares the hashes of the browser's GET request response and the gateway response. If the match is incorrect, the request is blocked and a page is shown with information about the cause of this action.

## What remains

- Apply DeclarativeNetRequest blockade on all NFA domains.
- Connect it to NFA API endpoints to fetch all NFA domains and their latest IPFS CID.
