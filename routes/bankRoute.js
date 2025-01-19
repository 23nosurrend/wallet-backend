import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import  Bank from '../controllers/bankController.js';

const router = express.Router();

router.patch('/update', authMiddleware, Bank);

export default router;