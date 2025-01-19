import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { updateBudget,readBudget }  from '../controllers/budgetControllers.js';

const router = express.Router();

router.patch('/update', authMiddleware, updateBudget);
router.get('/read', authMiddleware, readBudget);

export default router;