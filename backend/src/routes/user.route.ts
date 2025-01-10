import express, { Router } from 'express';
import { register } from "../controllers/user.controller";
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.post('/', catchAsync(register));
export default router;