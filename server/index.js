require('dotenv').config({ path: 'variables.env' });

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const processMessage = require('./process-message');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post("/api/chat", (req, res) => {
    const { message } = req.body;
    response = processMessage(message).then((data) => res.json(data));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});