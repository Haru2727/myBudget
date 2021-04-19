// create a DB then request it using indexedDB
// have commands for onupgradeneeded, onsuccess, onerror
// then need to save the record and and check the database for it once
// it is reopened.  If it isnt there it should add or create it to the DB

// also need a manifest.webmanifest alond with a service-worker.js this will allow for the files to 
// be cached and kept offline when need be