import { body, param } from 'express-validator';
import { Post } from '../models/post.model';

// Validator for ':slug'
export const slugValidator = [
    param('slug', 'Invalid slug').isString().trim().escape(),
    param('slug').custom(async (slug) => {
        const existingPost = await Post.findOne({ slug });
        if (!existingPost) {
            throw new Error('Post with the specified slug does not exist');
        }
    }),
];

// Validator for ':id'
export const idValidator = [
    param('id', 'Invalid ID').isMongoId().withMessage('ID must be a valid MongoDB ObjectId'),
    param('id').custom(async (id) => {
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            throw new Error('Post with the specified ID does not exist');
        }
    }),
];
export const postValidator = [
    // Validate 'user' (required ObjectId)
    body('user', 'User is required').not().isEmpty().isMongoId().withMessage('Invalid user ID'),

    // Validate 'img' (optional, must be a valid image URL)
    body('img')
        .optional()
        .isString()
        .withMessage('Image must be a valid string URL')
        .matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp)$/i)
        .withMessage('Image must be a valid image URL'),

    // Validate 'title' (required, length 3–100 characters)
    body('title', 'Title is required').not().isEmpty().trim().escape(),
    body('title', 'Title must be between 3 and 100 characters').isLength({ min: 3, max: 100 }).trim().escape(),

    // Validate 'slug' (required, unique)
    body('slug', 'Slug is required').not().isEmpty().trim().escape(),
    body('slug', 'Slug must contain only letters, numbers, and dashes')
        .matches(/^[a-zA-Z0-9-]+$/)
        .trim()
        .escape(),
    body('slug').custom(async (slug) => {
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            throw new Error('Slug must be unique');
        }
    }),

    // Validate 'desc' (optional, length up to 500 characters)
    body('desc')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters')
        .trim()
        .escape(),

    // Validate 'category' (optional, default is 'general')
    body('category')
        .optional()
        .isString()
        .withMessage('Category must be a string')
        .isLength({ max: 50 })
        .withMessage('Category cannot exceed 50 characters')
        .trim()
        .escape(),

    // Validate 'content' (required, length 10–5000 characters)
    body('content', 'Content is required').not().isEmpty().trim().escape(),
    body('content', 'Content must be between 10 and 5000 characters').isLength({ min: 10, max: 5000 }).trim().escape(),

    // Validate 'isFeatured' (optional, must be boolean)
    body('isFeatured')
        .optional()
        .isBoolean()
        .withMessage('isFeatured must be a boolean'),

    // Validate 'visit' (optional, must be an integer)
    body('visit')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Visit must be a non-negative integer'),
];
