import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import  Cash from '../controllers/cashController.js';

const router = express.Router();

router.patch('/update', authMiddleware, Cash);

export default router;