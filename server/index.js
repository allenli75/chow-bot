require('dotenv').config({ path: 'variables.env' });

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const processMessage = require('./process-message');
const { findRecipe, filterRecipes, filterCategory, filterCourse } = require('./find-recipes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

/** Render React app routes on server side */
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
 *   Retrieve recipes matching URL query params from MongoDB
 */
app.get("/api/recipe", (req, res) => {
    const name = req.query.name;
    client.connect(err => {
        findRecipe(client, name, 1)
        .then(data => res.json(data[0]));
    });
});

/**
 * POST /api/chat
 *   Submit user message to Dialogflow for intent detection and return response
 */
app.post("/api/chat", (req, res) => {
    const { message } = req.body;
    processMessage(message)
    .then((data) => {
        if (data.intent === 'recipe') {
            client.connect(err => {
                filterRecipes(client, data, 10)
                .then(data => {
                    const response = {
                        intent: data.intent,
                        text: data.text,
                        recipes: data.recipes,
                    }
                    res.json(response);
                });
            });
        } else {
            const response = {
                intent: data.intent,
                text: data.text,
                recipes: [],
            };
            res.json(response);
        }
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});
