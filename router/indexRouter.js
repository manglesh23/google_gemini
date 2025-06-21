import express from 'express';
import geminiRouter from './geminiRouter.js';
import geminiMemoryRouter from './geminiMemoryEnabled.js';
import geminiWithMongoRouter from './geminiWithMongoRouter.js';

const router= express.Router();

router.use('/gemini',geminiRouter);
router.use('/gemini',geminiMemoryRouter);
router.use('/gemini',geminiWithMongoRouter);

export default router;