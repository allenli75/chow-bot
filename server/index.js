require('dotenv').config({ path: 'variables.env' });

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const processMessage = require('./process-message');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

// MongoDB setup
const uri = "mongodb+srv://allenli:" + process.env.MONGODB_USER_PASSWORD + "@cluster0.tglxh.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/api/recipe", (req, res) => {
    const name = req.query.name;
    client.connect(err => {
        recipes = findRecipes(client, name, 1)
        .then(data => res.json(data[0]));
    });
});

async function findRecipes(client, recipeName, limit) {
    const cursor = client.db("chow_bot").collection("recipes").find({uri_name: recipeName}).limit(limit);
    const recipes = await cursor.toArray();
    return recipes;
}

app.post("/api/chat", (req, res) => {
    const { message } = req.body;
    response = processMessage(message)
    .then((data) => res.json(data))
    .catch(err => {
        console.error('ERROR:', err);
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});
