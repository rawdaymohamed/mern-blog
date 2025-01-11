import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { db } from './dbConnection';
import userRoutes from "./routes/user.route";
import commentRoutes from "./routes/comment.route";
import postRoutes from "./routes/post.route";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use((_err: ErrorRequestHandler, _req: Request, res: Response) => {
    res.status(500).json({
        status: 'Failed',
        message: 'Something went wrong',
    });
});

db.then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
});