import cookieParser from "cookie-parser";
import express from "express";
import route from './routes/index.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

route(app);

app.listen(8800, () => {
    console.log('Conneted!!');
})