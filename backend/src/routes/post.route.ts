import express, { Router } from 'express';
import { create, getAll, getPost, deletePost } from "../controllers/post.controller";
import catchAsync from '../utils/catchAsync';

const router: Router = express.Router();
router.post('/', catchAsync(create));
router.get('/', catchAsync(getAll));
router.get('/:slug', catchAsync(getPost));
router.delete('/:id', catchAsync(deletePost));

export default router;