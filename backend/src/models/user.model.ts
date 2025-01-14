import { Schema, model } from 'mongoose';


//creating an interface 
interface IUser {
    clerkUserId: string;
    username: string,
    email: string,
    img: string,
    savedPosts: string[],
};

const usersSchema = new Schema<IUser>({
    clerkUserId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: [],
    }],
},
    { timestamps: true }
)

export const User = model<IUser>('User', usersSchema)