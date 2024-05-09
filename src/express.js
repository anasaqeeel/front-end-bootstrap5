const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 5000;

app.use(bodyParser.json());

// MongoDB URL and client setup
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.post('/verifyCredentials', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('front_end');
    const collection = database.collection('login');

    const { email, password } = req.body;
    const user = await collection.findOne({ email: email, password: password });

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying credentials');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
