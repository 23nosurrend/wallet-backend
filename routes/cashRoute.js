import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { updateCash, readCash } from '../controllers/cashController.js';

const router = express.Router();

router.patch('/update', authMiddleware, updateCash);
router.get('/read',authMiddleware,readCash)

export default router;