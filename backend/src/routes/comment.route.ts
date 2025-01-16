import express, { Router } from 'express';
import catchAsync from '../utils/catchAsync';
import { create, getAll } from '../controllers/comment.controller';
const router: Router = express.Router();

router.post('/:postId', catchAsync(create));
router.get('/:postId', catchAsync(getAll));
export default router;