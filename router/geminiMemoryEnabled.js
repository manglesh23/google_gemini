import express from 'express';
import { geminiMemoryEnabled } from '../controller/geminiMemoryEnabled.js';
const geminiMemoryRouter= express.Router();

geminiMemoryRouter.post("/geminiMemory",geminiMemoryEnabled);

export default geminiMemoryRouter;