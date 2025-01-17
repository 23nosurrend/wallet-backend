import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import  updateBudget  from '../controllers/budgetControllers.js';

const router = express.Router();

router.patch('/update', authMiddleware, updateBudget);

export default router;