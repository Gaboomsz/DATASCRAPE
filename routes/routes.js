import express from 'express';
import {quotesController, pokemonController, prcController} from '../controller/routeController.js';

const apiRouter = express.Router();

apiRouter.get('/quotes', quotesController);
apiRouter.get('/pokemon', pokemonController);
apiRouter.get('/prc',prcController )

export default apiRouter;