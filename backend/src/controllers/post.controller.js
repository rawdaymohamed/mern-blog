import { Post } from '../models/post.model';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model';
import ImageKit from 'imagekit';

export const create = async (req, res) => {
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

export const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};

        const { cat, author, search, sort, featured } = req.query;

        if (cat) query.category = cat;
        if (search) query.title = { $regex: search, $options: "i" };
        if (featured) query.isFeatured = true;

        if (author) {
            const user = await User.findOne({ username: author }).select("_id");
            if (!user) return res.status(404).json({ message: "No post found!" });
            query.user = user._id;
        }

        let sortObj = { createdAt: -1 };
        switch (sort) {
            case "oldest":
                sortObj = { createdAt: 1 };
                break;
            case "popular":
            case "trending":
                sortObj = { visit: -1 };
                if (sort === "trending") {
                    query.createdAt = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
                }
                break;
            default:
                break;
        }

        const [posts, totalPosts] = await Promise.all([
            Post.find(query)
                .populate("user", "username")
                .sort(sortObj)
                .limit(limit)
                .skip((page - 1) * limit),
            Post.countDocuments(query),
        ]);

        res.status(200).json({
            status: "success",
            posts,
            hasMore: page * limit < totalPosts,
            nextPage: page + 1,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getPost = async (req, res) => {
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
export const deletePost = async (req, res) => {
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
    urlEndpoint: process.env.IK_PUBLIC_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});
export const upload_auth = async (req, res) => {
    let result = imagekit.getAuthenticationParameters();
    res.send(result);

}
export const saveUnsavePost = async (req, res) => {
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


export const isSaved = async (req, res) => {
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

export const featureUnFeaturePost = async (req, res) => {

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
