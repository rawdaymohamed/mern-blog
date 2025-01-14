
import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model';

export const create = async (req: any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let counter = 2;
    let slugBase = req.body.title.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
    let slug = slugBase;
    while (await Post.findOne({ slug })) {
        slug = `${slugBase}-${counter}`;
        counter++;
    }

    const clerkUserId = req.auth.userId;
    if (!clerkUserId) return res.status(401).json({
        status: "Failure",
        message: "Unauthenticated"
    })
    const user = await User.findOne({ clerkUserId });
    if (!user) return res.status(404).json({
        status: "Failure",
        message: "User not found"
    });

    const data = new Post({ ...req.body, user: user._id, slug });
    await data.save();

    return res.status(201).json({
        status: "Success",
        data: data,
    });

};
export const getAll = async (req: Request, res: Response) => {
    const data = await Post.find();
    return res.status(200).json({
        status: "Success",
        data: data,
    });

};

export const getPost = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = await Post.findOne({ slug: req.params.slug });
    return res.status(200).json({
        status: "Success",
        data: data,
    });
};
export const deletePost = async (req: any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) return res.status(401).json({
        status: "Failure",
        message: "Unauthenticated"
    })
    const user = await User.findOne({ clerkUserId });
    if (!user) return res.status(404).json({
        status: "Failure",
        message: "User not found"
    });

    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id, user: user._id });
    if (!deletedPost)
        return res.status(403).json({
            status: "Failure",
            message: "You can only delete your posts"
        })
    return res.status(200).json({
        status: "Success",
        message: "deleted",
        data: deletedPost,
    });

};
