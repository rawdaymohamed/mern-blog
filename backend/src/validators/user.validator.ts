import { body } from 'express-validator'
import { User } from '../models/user.model';
export const registerValidator = [
    // Validate 'username'
    body('username', 'Username is required').not().isEmpty().trim().escape(),
    body('username', 'Username must be between 3 and 20 characters')
        .isLength({ min: 3, max: 20 })
        .trim()
        .escape(),
    body('username').custom(async (username) => {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already in use');
        }
    }),

    // Validate 'email'
    body('email', 'Email is required').not().isEmpty().trim().escape(),
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    body('email').custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }
    }),

    // Validate 'img'
    body('img')
        .optional()
        .isString()
        .withMessage('Image must be a valid string URL')
        .matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp)$/i)
        .withMessage('Image must be a valid image URL'),

    // Validate 'savedPosts'
    body('savedPosts')
        .optional()
        .isArray()
        .withMessage('Saved posts must be an array'),
    body('savedPosts.*')
        .optional()
        .isMongoId()
        .withMessage('Each saved post ID must be a valid MongoDB ObjectId'),
];