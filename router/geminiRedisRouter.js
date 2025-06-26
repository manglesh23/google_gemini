import express from 'express';
import { geminiWithRedis } from '../controller/geminiWithRedis.js';

const geminiWithRedisRouter= express.Router();

geminiWithRedisRouter.post('/geminiredis',geminiWithRedis);

export default geminiWithRedisRouter;