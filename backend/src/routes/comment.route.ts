import express, { Router } from 'express';
import catchAsync from '../utils/catchAsync';
import { create, getAll, deleteComment } from '../controllers/comment.controller';
const router: Router = express.Router();

router.post('/:postId', catchAsync(create));
router.delete('/:id', catchAsync(deleteComment));
router.get('/:postId', catchAsync(getAll));
export default router;