const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/api/v1', routes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});