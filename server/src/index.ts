
import "reflect-metadata";
import Router from './routers';
import UplaodRouter from './routers/UploadRouter';
import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/upload', express.static('public/upload'));

app.use('/upload', UplaodRouter);


app.use('/api/movie', Router);
app.listen(3000, () => {
    console.log('服务器连接成功')
})

