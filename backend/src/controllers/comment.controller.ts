
import { Request, Response } from 'express';
import { Comment } from "../models/comment.model";
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

export const create = async (req: any, res: Response) => {
    try {
        const { postId } = req.params;
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


        const data = new Comment({ ...req.body, user: user._id, post: postId });
        await data.save();

        return res.status(201).json({
            status: "Success",
            data: data,
        });

    } catch (error: any) {
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while creating the comment",
        });
    }
};
export const getAll = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const allComments = await Comment.find({ post: postId }).populate("user", "username img").sort({ createdAt: -1 })
    return res.status(201).json({
        status: "Success",
        data: allComments,
    });

}