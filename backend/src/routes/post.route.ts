import express, { Router } from 'express';
import { create, getAll, getPost, deletePost, upload_auth, saveUnsavePost, isSaved } from "../controllers/post.controller";
import catchAsync from '../utils/catchAsync';
import { idValidator, postValidator, slugValidator } from '../validators/post.validator';


const router: Router = express.Router();
router.get('/upload-auth', catchAsync(upload_auth));
router.patch('/:id/save', catchAsync(saveUnsavePost));
router.get('/:id/is-saved', catchAsync(isSaved));
router.get('/:slug', slugValidator, catchAsync(getPost));
router.delete('/:id', idValidator, catchAsync(deletePost));
router.post('/', postValidator, catchAsync(create));
router.get('/', catchAsync(getAll));
export default router;