require('dotenv').config({ path: 'variables.env' });

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const processMessage = require('./process-message');
const findRecipes = require('./find-recipes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

/** Render views on server side */
app.get("/chat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.get("/recipe/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

/** MongoDB setup */ 
const uri = "mongodb+srv://allenli:" + process.env.MONGODB_USER_PASSWORD + "@cluster0.tglxh.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/** API BEGINS HERE */ 
/**
 * GET /api/recipe
 *   Retrieves recipes matching URL query param from MongoDB
 */
app.get("/api/recipe", (req, res) => {
    const name = req.query.name;
    client.connect(err => {
        recipes = findRecipes(client, name, 1)
        .then(data => res.json(data[0]));
    });
    client.close();
});

/**
 * POST /api/chat
 *   Submits user message to Dialogflow for intent detection and returns response
 */
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
