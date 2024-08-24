import express from "express";
import mySqlDb from "../mySqlDb";
import {News, NewsMutation} from "../types";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";


const newsRouter = express.Router();

newsRouter.get("/", async (req: express.Request, res: express.Response, next) => {
    try {
        const result = await mySqlDb.getConnection().query("SELECT * FROM news");
        const categories = result[0] as News[];
        return res.send(categories);
    } catch (e) {
        next(e);
    }
})

newsRouter.get("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;
        const result = await mySqlDb.getConnection().query("SELECT * FROM news WHERE id = ?",
            [id]);
        const category = result[0] as News[];
        if (category.length === 0) {
            return res.status(404).send("No news found.");
        }
        return res.send(category[0]);
    } catch (e) {
        next(e);
    }
})


newsRouter.post("/", imagesUpload.single('image'), async (req: express.Request, res: express.Response) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({error: 'Title and description are required!'});
    }


    const news: NewsMutation = {
        title: req.body.title,
        describe: req.body.describe,
        image: req.file ? req.file.filename : null,
    }

    const insertResult = await mySqlDb.getConnection().query(
        'INSERT INTO news (title,`describe`,image) VALUES (?,?,?)',
        [news.title, news.describe, news.image],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mySqlDb.getConnection().query(
        'SELECT * FROM news WHERE id = ?',
        [resultHeader.insertId]
    );

    const tiding = getNewResult[0] as News[];
    return res.send(tiding[0]);
})


export default newsRouter;