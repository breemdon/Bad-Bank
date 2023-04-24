const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const db = client.db('myproject');
    const collection = db.collection('users');
    //console.log(collection)
    // Find the first document in the collection
    const allusers = await collection.find()
    //.toArray(function(err, docs) {
       // err ? reject(err) : resolve(docs);
//});
    console.log(allusers);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);

// return all users by using the collection.find method
async function all() {
    if(db === null) {
        await connect();
    }
    return new Promise((resolve, reject) => {
        const customer = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
        return customer;
    })
}

// connect to mongo
// async function connect() {
//     console.log("is this working");
//     const client = await MongoClient.connect(url, { useUnifiedTopology: true});
//     db = client.db('myproject')
    // await MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    //     console.log("Connected successfully to db server");
    //     console.error(err);

    // // connect to myproject database
    //     db = client.db('myproject');
    // });
// }

// create user account using the collection.insertOne function
async function create(name, email, password){
    if(db === null) {
        await connect();
    }
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account 
async function find(email) {
    if(db === null) {
        await connect();
    }
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
async function findOne(email) {
    if(db === null) {
        await connect();
    }
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
async function update(email, amount) {
    if(db === null) {
        await connect();
    }
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
async function all() {
    if(db === null) {
        await connect();
    }
    return new Promise((resolve, reject) => {
        const customer = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
        return customer;
    })
}

module.exports = {create, findOne, find, update, all};