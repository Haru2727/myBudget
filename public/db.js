// create a DB then request it using indexedDB
// have commands for onupgradeneeded, onsuccess, onerror
// then need to save the record and and check the database for it once
// it is reopened.  If it isnt there it should add or create it to the DB

// also need a manifest.webmanifest alond with a service-worker.js this will allow for the files to 
// be cached and kept offline when need be
let db;
// create a new db request for a "budget" database
const request = indexedDB.open("budget",1);

request.onupgradeneeded = function (e) {
    // create object store called "pending" and set autoIncrement to true
    const db = e.target.result;
    db.createObjectStore("pending", {autoIncrement: true});
};

request.onsucess = function (e) {
    const db = e.target.result;
    // checking if the app is online before starting to read from db
    if (navigator.onLine) {
        checkDB();
    }
};

request.onerror = function (e) {
    console.log("ERROR!!! " + e.target.errorCode);
};

function saveRecord(record) {
    // create a transaction on the opending db with a readwrite access
    const transaction = db.transaction(["pending"], "readwrite");

    // access your pending object store
    const store = transaction.createObjectStore("pending");

    // add the record to your store with add method
    store.add(record);
};

function checkDB() {

}