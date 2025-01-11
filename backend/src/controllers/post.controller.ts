
import { Request, Response } from 'express';
import { Post } from '../models/post.model';

export const create = async (req: Request, res: Response) => {
    try {
        const data = await Post.create(req.body);

        return res.status(201).json({
            status: "Success",
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while creating the post",
        });
    }
};
export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await Post.find();

        return res.status(200).json({
            status: "Success",
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while getting the posts",
        });
    }
};

export const getPost = async (req: Request, res: Response) => {
    try {
        const data = await Post.findOne({ slug: req.params.slug });

        return res.status(200).json({
            status: "Success",
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while getting the posts",
        });
    }
};