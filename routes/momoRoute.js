import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import  Momo from '../controllers/momoController.js';

const router = express.Router();

router.patch('/update', authMiddleware, Momo);

export default router;