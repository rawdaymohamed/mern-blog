import { Post } from "../models/post.model";

import { NextFunction, Request, Response } from "express";
const increaseVisit = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    await Post.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });

    next();
};

export default increaseVisit;