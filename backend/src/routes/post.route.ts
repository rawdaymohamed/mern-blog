import express, { Router } from 'express';
const { create, getAll, getPost, deletePost, upload_auth, saveUnsavePost, isSaved, featureUnFeaturePost } = require("../controllers/post.controller");
import catchAsync from '../utils/catchAsync';
import { idValidator, postValidator, slugValidator } from '../validators/post.validator';
import increaseVisit from '../middlewares/increaseVisits';


const router: Router = express.Router();
router.get('/upload-auth', catchAsync(upload_auth));
router.patch('/:id/feature', catchAsync(featureUnFeaturePost));
router.patch('/:id/save', catchAsync(saveUnsavePost));
router.get('/:id/is-saved', catchAsync(isSaved));
router.get('/:slug', slugValidator, increaseVisit, catchAsync(getPost));
router.delete('/:id', idValidator, catchAsync(deletePost));
router.post('/', postValidator, catchAsync(create));
router.get('/', catchAsync(getAll));
export default router;