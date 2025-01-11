import express, { Router } from 'express';
import { create, getAll, getPost } from "../controllers/post.controller";
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.post('/', catchAsync(create));
router.get('/', catchAsync(getAll));
router.get('/:slug', catchAsync(getPost));

export default router;