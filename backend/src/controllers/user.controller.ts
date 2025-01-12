
import { Request, Response } from 'express';
import { User } from "../models/user.model";
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() })
    }

    const data = await User.create(req.body);
    const response = await User.findById(data._id).select("username email");

    return res.status(201).json({
        status: "Success",
        data: response,

    })
};
