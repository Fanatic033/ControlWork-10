import express from "express";
import mySqlDb from "./mySqlDb";

const app = express();
const port =  8000;


app.use(express.json());


const run = async () => {
    await mySqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);
