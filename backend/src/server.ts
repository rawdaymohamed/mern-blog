import express, { Request, Response } from 'express';
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

db.then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
});