import express from 'express';
import { db } from '../src/dbConnection';
import userRoutes from "../src/routes/user.route";
import commentRoutes from "../src/routes/comment.route";
import postRoutes from "../src/routes/post.route";
import clerkRoutes from "../src/routes/webhook.route";
import { clerkMiddleware } from '@clerk/express'
import cors from "cors";

const app = express();
if (!process.env.CLIENT_URL) {
    throw new Error("Please provide client url");
}
// Configure CORS options
const corsOptions = {
    origin: process.env.CLIENT_URL, // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
};
// Use CORS middleware
app.use(cors(corsOptions));


const port = process.env.PORT || 4000;
app.use(clerkMiddleware());
app.use("/webhooks", clerkRoutes);
app.use(express.json());

// allow cross-origin requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/auth-state", (req, res) => {
    const authState = req.auth;
    res.json(authState);
})
// app.get("/protected", (req: any, res: any) => {
//     const { userId } = req.auth;
//     if (!userId)
//         return res.status(401).json({ message: "Not authenticated" });
//     res.status(200).json({ message: "Success" });
// });

// app.get("/protected1", requireAuth(), (req: Request, res: Response) => {
//     res.json({ message: "Success" });
// })

app.use((_err, _req, res, _next) => {
    res.status(500).json({
        status: 'Failed',
        message: 'Something went wrong',
    });
});

db.then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
});
export default app;