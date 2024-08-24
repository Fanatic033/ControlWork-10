import express from "express";
import mySqlDb from "../mySqlDb";
import {CommentMutation, News} from "../types";
import {ResultSetHeader} from "mysql2";

const commentsRouter = express.Router();


commentsRouter.get("/", async (req: express.Request, res: express.Response, next) => {
    try {
        const result = await mySqlDb.getConnection().query("SELECT * FROM comment");
        const categories = result[0] as News[];
        return res.send(categories);
    } catch (e) {
        next(e);
    }
})

commentsRouter.get("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;
        const result = await mySqlDb.getConnection().query("SELECT * FROM comment WHERE id = ?",
            [id]);
        const category = result[0] as Comment[];
        if (category.length === 0) {
            return res.status(404).send("No comment found.");
        }
        return res.send(category[0]);
    } catch (e) {
        next(e);
    }
})


commentsRouter.post("/", async (req: express.Request, res: express.Response, next) => {
    try {
        if (!req.body.message || !req.body.id_news) {
            return res.status(400).send({error: 'news_id and message are required!'});
        }

        const comment: CommentMutation = {
            id_news: parseInt(req.body.id_news),
            author: req.body.author,
            message: req.body.message,
        }

        const insertResult = await mySqlDb.getConnection().query(
            'INSERT INTO comment (id_news,author,message) VALUES (?,?,?)',
            [comment.id_news, comment.author, comment.message],
        );

        const resultHeader = insertResult[0] as ResultSetHeader;

        const getNewResult = await mySqlDb.getConnection().query(
            'SELECT * FROM comment WHERE id = ?',
            [resultHeader.insertId]
        );

        const message = getNewResult[0] as News[];
        return res.send(message[0]);
    } catch (e) {
        next(e)
    }

})


export default commentsRouter