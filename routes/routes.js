import express from 'express';
import {quotesController, pokemonController} from '../controller/routeController.js';

const apiRouter = express.Router();

apiRouter.get('/quotes', quotesController);
apiRouter.get('/pokemon', pokemonController);

export default apiRouter;