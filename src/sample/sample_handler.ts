import 'source-map-support/register';

import express from 'express';

// Create an express server
export const app = express();
// register json parsing middleware
app.use(express.json());

// that listens to a POST /hello endpoint
// and responds with a JSON message
// also parse the body of the request
app.post('/', (req, res) => {
  console.log(new Date().toISOString(), 'Got message', req.body);
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: `Nice to meet you, ${req.body.name}!` });
});

const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
