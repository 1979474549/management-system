
import "reflect-metadata";
import Router from './routers';
import UplaodRouter from './routers/UploadRouter';
import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';

const app = express();
app.use(express.json());
app.use(history());
app.use('/', express.static('public/build'))
app.use('/upload', express.static('public/upload'));

app.use('/upload', UplaodRouter);


app.use('/api/movie', Router);
app.listen(4000, () => {
    console.log('服务器连接成功')
})

