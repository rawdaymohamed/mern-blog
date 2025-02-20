
import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model';
import ImageKit from 'imagekit';

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
    // Extract 'page' and 'limit' from query parameters and set default values
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    // Calculate the starting index for pagination
    const startIndex = (page - 1) * limit;

    // Get the posts with pagination
    const data = await Post.find()
        .populate("user", "username")
        .skip(startIndex)
        .limit(limit);

    // Get the total count of posts for reference
    const total = await Post.countDocuments();
    const hasMore = page * limit < total;
    return res.status(200).json({
        status: "Success",
        total,
        page,
        limit,
        hasMore,
        data
    });

};

export const getPost = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = await Post.findOne({ slug: req.params.slug }).populate("user", "username img");
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
    if (req.auth.sessionClaims?.metadata?.role === "admin") {
        const data = await Post.findOneAndDelete({ _id: req.params.id });
        return res.json({
            status: "Success",
            message: "deleted",
            data,
        })
    }
    const clerkUserId = req.auth?.userId;

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
const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_PUBLIC_URL_ENDPOINT!!,
    publicKey: process.env.IK_PUBLIC_PUBLIC_KEY!!,
    privateKey: process.env.IK_PRIVATE_KEY!!
});
export const upload_auth = async (req: Request, res: Response) => {
    let result = imagekit.getAuthenticationParameters();
    res.send(result);

}
export const saveUnsavePost = async (req: any, res: Response) => {
    try {
        const clerkUserId = req.auth?.userId;
        const { id: postId } = req.params; // Extracts `postId` from URL params.

        if (!clerkUserId) {
            return res.status(401).json({
                status: "Failure",
                message: "Unauthenticated",
            });
        }

        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.status(404).json({
                status: "Failure",
                message: "User not found",
            });
        }

        // Check if the post is already saved
        const postIndex = user.savedPosts.indexOf(postId);

        if (postIndex === -1) {
            // Post is not saved, add it to savedPosts
            user.savedPosts.push(postId);
            await user.save();
            return res.status(200).json({
                status: "Success",
                message: "Post saved successfully",
                savedPosts: user.savedPosts,
            });
        } else {
            // Post is already saved, remove it from savedPosts
            user.savedPosts.splice(postIndex, 1);
            await user.save();
            return res.status(200).json({
                status: "Success",
                message: "Post unsaved successfully",
                savedPosts: user.savedPosts,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Failure",
            message: "An error occurred",
        });
    }
};


export const isSaved = async (req: any, res: Response) => {
    try {
        const clerkUserId = req.auth?.userId;
        const { id: postId } = req.params;

        if (!clerkUserId) {
            return res.status(401).json({
                status: "Failure",
                message: "Unauthenticated",
            });
        }

        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.status(404).json({
                status: "Failure",
                message: "User not found",
            });
        }

        // Check if the postId exists in the user's savedPosts
        const isPostSaved = user.savedPosts.includes(postId);

        return res.status(200).json({
            status: "Success",
            message: isPostSaved ? "Post is saved" : "Post is not saved",
            isSaved: isPostSaved,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Failure",
            message: "An error occurred",
        });
    }
};

export const featureUnFeaturePost = async (req: any, res: Response) => {

    if (req.auth.sessionClaims?.metadata?.role === "admin") {
        const post = await Post.findOne({ _id: req.params.id }).select("isFeatured");

        const data = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { isFeatured: !post?.isFeatured } },
            { new: true }
        );
        return res.json({
            status: "Success",
            message: "Post feature updated",
            data,
        })
    }
};
