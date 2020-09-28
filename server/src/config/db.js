const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://root:10filipe@cluster0.gng5l.mongodb.net/database?retryWrites=true&w=majority";


// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect();

module.exports = client;