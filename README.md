# Spec

We need a thin PWA to demonstrate the following behaviour:

- The continuing functionality of the front-end without any internet connection
- Automatically detecting the resumption of an internet connection
- Synchronizing in the background whenever there is an internet connection
- Testing whether local NoSQL database can work as standin for cache
- Reporting to application when a sync has been performed
- Also show what happens when internet resumes and browser has been closed!

# Proof of concept design

The proof of concept has a basic http-server which will log any requests to console.

It also has an installable PWA.

The PWA has textarea with a default JSON Object that will be sent to the Database to be made available for the ServiceWorker. 

# Discoveries

- Using a `manifest.json` file it is possible to create the standalone application. See description [here](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#the_web_app_manifest).

# Todo

- [ ] Review <https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#the_web_app_manifest>
- [ ] Code:
  - [x] Save new data to IndexDB
  - [x] Have ServiceWorker synch IndexDB to server
  - [x] Set up periodicSync to fetch changes too
- [ ] Look up:
  - [ ] <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules>
  - [ ]

# Demo

1. Go through the structure of the client/server - starting with server.
2. Show terminal logging here.
3. Go through client
4. Show that it can install - with `manifest.json`
5. Database Indexed.db - demo and explain that architecture is connecting the service worker with the window worker.
6. Show
