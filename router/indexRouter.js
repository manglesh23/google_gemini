import express from 'express';
import geminiRouter from './geminiRouter.js';

const router= express.Router();

router.use('/gemini',geminiRouter);

export default router;