import express, { NextFunction, Request, Response } from 'express';
import { db } from './dbConnection';
import userRoutes from "./routes/user.route";
import commentRoutes from "./routes/comment.route";
import postRoutes from "./routes/post.route";
import clerkRoutes from "./routes/webhook.route";
import { clerkMiddleware, requireAuth } from '@clerk/express'
const app = express();
const port = process.env.PORT || 4000;
app.use(clerkMiddleware());
app.use("/webhooks", clerkRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// app.get("/auth-state", (req: any, res) => {
//     const authState = req.auth;
//     res.json(authState);
// })
// app.get("/protected", (req: any, res: any) => {
//     const { userId } = req.auth;
//     if (!userId)
//         return res.status(401).json({ message: "Not authenticated" });
//     res.status(200).json({ message: "Success" });
// });

// app.get("/protected1", requireAuth(), (req: Request, res: Response) => {
//     res.json({ message: "Success" });
// })

app.use((_err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
        status: 'Failed',
        message: 'Something went wrong',
    });
});

db.then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
});