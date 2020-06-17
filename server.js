const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process-message');
const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, 'client/build');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/chat', (req, res) => {
  const { message } = req.body;
  processMessage(message);
  res.json();
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
