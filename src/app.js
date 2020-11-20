import express, { urlencoded, json } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import helpers from './helpers';

dotenv.config();

// using environmental variables
const { PORT, HOST } = process.env;

// App
const app = express();

const { logger } = helpers;

// middleware to retrieve uploaded image
// app.use(express.static(`${__dirname}/uploads/avatar`));
// app.use(express.static(`${__dirname}/invoices/debitnotes`));

// Initializing bodyparser
app.use(json());
app.use(urlencoded());

// load all routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Resource does not exist.');
  error.status = 404;
  next(error);
});

app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);

export default app;
