import express, { Router } from 'express';
import { create } from "../controllers/post.controller";
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.post('/', catchAsync(create));
export default router;