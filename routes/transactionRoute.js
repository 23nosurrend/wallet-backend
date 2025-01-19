import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createTransaction,getTransactionHistory } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/create', authMiddleware, createTransaction);
router.get('/read', authMiddleware, getTransactionHistory);

export default router;