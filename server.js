import apiRouter from './routes/routes.js';
import express from 'express';

const app = express();
const PORT = 8080;

app.use('/scrape', apiRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
