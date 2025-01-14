import express, { Router } from 'express';
import { register } from "../controllers/user.controller";
import catchAsync from '../utils/catchAsync';
import { registerValidator } from '../validators/user.validator';
const router: Router = express.Router();

router.post('/', registerValidator, catchAsync(register));
export default router;