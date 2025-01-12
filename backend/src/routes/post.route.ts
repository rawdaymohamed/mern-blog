import express, { Router } from 'express';
import { create, getAll, getPost, deletePost } from "../controllers/post.controller";
import catchAsync from '../utils/catchAsync';
import { idValidator, postValidator, slugValidator } from '../validators/post.validator';

const router: Router = express.Router();
router.post('/', postValidator, catchAsync(create));
router.get('/', catchAsync(getAll));
router.get('/:slug', slugValidator, catchAsync(getPost));
router.delete('/:id', idValidator, catchAsync(deletePost));

export default router;