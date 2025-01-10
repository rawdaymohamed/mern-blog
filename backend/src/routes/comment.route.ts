import express, { Router } from 'express';
import catchAsync from '../utils/catchAsync';
import { create } from '../controllers/comment.controller';
const router: Router = express.Router();

router.post('/', catchAsync(create));
export default router;