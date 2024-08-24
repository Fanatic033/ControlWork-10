import express from "express";
import mySqlDb from "../mySqlDb";
import {CommentMutation, News} from "../types";
import {ResultSetHeader} from "mysql2";

const commentsRouter = express.Router();


commentsRouter.get("/", async (req: express.Request, res: express.Response, next) => {
    try {
        const result = await mySqlDb.getConnection().query("SELECT * FROM comment");
        const comments = result[0] as Comment[];
        return res.send(comments);
    } catch (e) {
        next(e);
    }
})

commentsRouter.get("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;
        const result = await mySqlDb.getConnection().query("SELECT * FROM comment WHERE id = ?",
            [id]);
        const comment = result[0] as Comment[];
        if (comment.length === 0) {
            return res.status(404).send("No comment found.");
        }
        return res.send(comment[0]);
    } catch (e) {
        next(e);
    }
})


commentsRouter.post("/", async (req: express.Request, res: express.Response, next) => {
    try {
        if (!req.body.message || !req.body.id_news) {
            return res.status(400).send({error: 'news_id and message are required!'});
        }

        const id_news = parseInt(req.body.id_news);

        const newsResult = await mySqlDb.getConnection().query(
            'SELECT * FROM news WHERE id = ?',
            [id_news]
        );
        const news = newsResult[0] as News[];

        if (news.length === 0) {
            return res.status(404).send({error: 'News with the specified ID does not exist.'});
        }

        const author = req.body.author ? req.body.author : "Anonymous";

        const comment: CommentMutation = {
            id_news,
            author,
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

        const message = getNewResult[0] as Comment[];
        return res.send(message[0]);
    } catch (e) {
        next(e)
    }
})


commentsRouter.delete("/:id", async (req: express.Request, res: express.Response, next) => {
    try {
        const id = req.params.id;

        const result = await mySqlDb.getConnection().query(
            'DELETE FROM comment WHERE id = ?',
            [id]
        );

        const resultHeader = result[0] as ResultSetHeader;
        if (resultHeader.affectedRows === 0) {
            return res.status(404).send('No comment found.');
        }

        return res.send();
    } catch (e) {
        next(e);
    }
});


export default commentsRouter