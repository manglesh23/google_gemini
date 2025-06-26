import express from 'express';
import geminiRouter from './geminiRouter.js';
import geminiMemoryRouter from './geminiMemoryEnabled.js';
import geminiWithMongoRouter from './geminiWithMongoRouter.js';
import geminiWithRedisRouter from './geminiRedisRouter.js';

const router= express.Router();

router.use('/gemini',geminiRouter);
router.use('/gemini',geminiMemoryRouter);
router.use('/gemini',geminiWithMongoRouter);
// router.use('/gemini',geminiWithRedisRouter);

export default router;