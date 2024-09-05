// Create web server
// Create a server that listens on port 3000. When a GET request is made to the path /comments, read the comments.json file and return the comments as a JSON response.
// When a POST request is made to the path /comments, read the comments.json file and add the comment that was sent in the request body. Return the updated comments as a JSON response.

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('An error occurred');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('An error occurred');
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        return res.status(500).send('An error occurred');
      }
      res.json(comments);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

