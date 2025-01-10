
import { Request, Response } from 'express';
import { User } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
    try {
        const data = await User.create(req.body);
        const response = await User.findById(data._id).select("username email");
        return res.status(201).json({
            status: "Success",
            data: response,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "Failed",
            message: error.message || "An error occurred while creating the user",
        });
    }
};
