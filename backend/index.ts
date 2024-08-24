import express from "express";
import mySqlDb from "./mySqlDb";
import cors from "cors";
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";

const app = express();
const port =  8000;

app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.use('/news',newsRouter)
app.use('/comments',commentsRouter)


const run = async () => {
    await mySqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);
