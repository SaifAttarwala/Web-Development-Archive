const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);


// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    insertDocuments(db, function () {
        client.close();
    });

    const insertDocuments = function (db, callback) {

        // Get the documents collection
        const collection = db.collection("fruits");
        // Insert some documents
        collection.insertMany([{
                fruit: "banana",
                taste: "good"
            },
            {
                fruit: "apple",
                taste: "ok",
            },
            {
                fruit: "mango",
                taste: "great"
            }
        ], function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        });
    }
});