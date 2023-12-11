const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const axios = require('axios');

app.use(cors());

app.get('/standings', async (req, res) => {
  try {
    const response = await axios.get("https://api-web.nhle.com/v1/standings/now");
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
})

app.get('/team/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/club-stats/${teamId}/now`)
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/team-stats/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/club-stats-season/${teamId}`);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/draft', async (req, res) => {
  try {
    const response = await axios.get('https://api.nhle.com/stats/rest/en/draft'); // this link doesnt provide the right info
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/scores', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/score/now');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/schedule', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/schedule/now');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'path-to-your-react-app/build')));

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'path-to-your-react-app/build', 'index.html'));
// });