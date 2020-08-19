const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    host: "localhost",
    databse: "database",
    password: "postgres",
    port: 5432,
});

console.log("connecting to database...");
client.connect();
console.log("connected!");

module.exports = client;