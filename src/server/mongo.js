const { MongoClient } = require("mongodb");

const mongoc = new MongoClient(process.env.MONGO_CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });

const gamblingCollection = () => {
    return mongoc.db('discordbots').collection('gambling')
}

async function connect(client) {
    await client.connect();
    await client.db("discordbots").command({ ping: 1 });
    console.log("Connected successfully to mongodb");
}

connect(mongoc).catch(e => {
    console.log("Failed to connect to mongodb")
    console.log(e)
    process.exit()
});

module.exports = {
    gamblingCollection
}