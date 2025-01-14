import { Schema, model } from 'mongoose';

//creating an interface 
interface IComment {
    user: string,
    post: string,
    desc: string,
};

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

//creating a model
export const Comment = model<IComment>('Comment', commentSchema)