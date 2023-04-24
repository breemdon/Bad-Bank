const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myproject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  const name = 'user' + Math.floor(Math.random()*10000);
  const email = name + '@mit.edu';
  
  const db = client.db(dbName);
  const collection = db.collection('customers');

    // put the rest of the code here... 
  var doc = {name, email};
   collection.insertOne(doc, {w:1}, function(err, result) {
    console.log('Document insert');
  });

  var customers = collection.find().toArray((err, docs) => {
    console.log('Collection:', docs);
  });

  return customers;
    
} 

main() 
   .then(console.log) 
   .catch(console.error) 
   .finally(() => client.close());