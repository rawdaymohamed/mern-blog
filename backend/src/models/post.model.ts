import { Schema, model } from 'mongoose';

//creating an interface 
interface IPost {
    user: string,
    img: string,
    title: string,
    slug: string,
    desc: string,
    category: string,
    content: string,
    isFeatured: boolean,
    visit: number,
};

const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        img: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
        },
        category: {
            type: String,
            default: "general",
        },
        content: {
            type: String,
            required: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        visit: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

//creating a model
export const Post = model<IPost>('Post', postSchema)