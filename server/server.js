import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// Initialize the Express App
const app = new Express();

import todoRoute from './routes/todo';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(Express.static('client/build'));
}

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use('/api', todoRoute);

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Find the server at: http://localhost:${serverConfig.port}/`); // eslint-disable-line no-console
  }
});

export default app;
