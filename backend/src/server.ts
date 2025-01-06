import express, { Request, Response } from 'express';
import { db } from './dbConnection';

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req: Request, res: Response) => { res.json({ message: "Test" }) })
db.then(() => {
    app.listen(port, () => console.log(`server running at http://localhost:${port}`));
});