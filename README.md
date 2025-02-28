# Spec

This thin progressive web application (PWA) demonstrates the following behaviour:

- The continuing functionality of the front-end without any internet connection.
- Automatically detecting the resumption of an internet connection.
- Synchronizing in the background whenever there is an internet connection.
- Testing whether local NoSQL database can work as standin for cache.
- Reporting to application when a sync has been performed.
- Also show what happens when internet resumes and browser has been closed!

# Proof of concept design
This repo has 2 applications
## Server
`/server` is a thin NodeJS server which has basic routes to simulate an API:
- POST /api: simulates handling an incoming synchronization from client -> server
- GET /api/patient: simulates updates from the server -> client

The server also serves the assets from PWA.
## PWA
All handled in `/pwa` this contains:
- index.html - the code for the Window worker. Data is saved from the `<textarea>...</textarea>` to the database. It also initiates the serviceworker.
- sw.js - this handles all the Service Worker code. It handles all the synchronizations - reading updates from the IndexedDB database. 
- assets/manifest.json - all the required setting for the PWA.  

# Discoveries

- Using a `manifest.json` file it is possible to create the standalone application. See description [here](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#the_web_app_manifest).

# Todo
- [ ] Update successfully synchronized records to set isSynchronized to true
- [ ] Only fetch isSynchronized = true records
- [ ] Mix both GET (new incoming) and POST (outgoing) parts of synchronization.

# To Demo

1. Go through the structure of the client/server - starting with server.
2. Show terminal logging here.
3. Go through client
4. Show that it can install - with `manifest.json`
5. Database Indexed.db - demo and explain that architecture is connecting the service worker with the window worker.
6. Show frontend operating with application offline.
7. Show sync working as soon as connection resumed.
8. Trigger Periodic Background Sync