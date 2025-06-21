import express from 'express';
import { geminiWithMongo } from '../controller/geminiWithMongo.js';

const geminiWithMongoRouter= express.Router();

geminiWithMongoRouter.post('/geminiwithmongo',geminiWithMongo);

export default geminiWithMongoRouter;