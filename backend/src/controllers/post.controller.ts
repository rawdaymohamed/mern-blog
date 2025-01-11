
import { Request, Response } from 'express';
import { Post } from '../models/post.model';

export const create = async (req: Request, res: Response) => {
    const data = await Post.create(req.body);
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
    const data = await Post.findOne({ slug: req.params.slug });
    return res.status(200).json({
        status: "Success",
        data: data,
    });
};
export const deletePost = async (req: Request, res: Response) => {
    const data = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        status: "Success",
        message: "deleted",
        data: data,
    });

};
