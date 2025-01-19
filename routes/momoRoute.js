import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import  {updateMomo,readMomo} from '../controllers/momoController.js';

const router = express.Router();

router.patch('/update', authMiddleware, updateMomo);
router.get('/read', authMiddleware, readMomo);

export default router;