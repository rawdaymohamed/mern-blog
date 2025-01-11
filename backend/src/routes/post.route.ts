import express, { Router } from 'express';
import { create, getAll } from "../controllers/post.controller";
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.post('/', catchAsync(create));
router.get('/', catchAsync(getAll));
export default router;