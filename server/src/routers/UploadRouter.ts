import multer from 'multer';
import express from 'express';
import path from 'path';
import { HandleResponse } from './HandleResponse';

const app = express();
const uploadRouter = app.use(express.Router());

//控制上传文件的文件名
const storage = multer.diskStorage({
    //确定文件保存路径
    destination: path.resolve(__dirname, '../../public/upload'),
    filename(req, file, cb) {
        //生成文件名
        const filename = new Date().getTime();
        //生成后缀名
        const extendName = path.extname(file.originalname);
        cb(null, `${filename}${extendName}`);
    }
})

const allowExtName = ['.jpg', '.png', '.gif', '.bwp'];

const upload = multer({
    storage,
    //文件大小限制
    limits: {
        fileSize: 1024 * 1024
    },
    //后缀名限制
    fileFilter(req, file, cb) {
        const extname = path.extname(file.originalname);
        if (allowExtName.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error('文件类型错误'), false);
        }
    }
}).single('myfile');

uploadRouter.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            // 发生错误
            HandleResponse.sendError(err.message, res);
        } else {
            HandleResponse.sendData(`/upload/${req.file.filename}`, res);
        }
    })
})

export default uploadRouter;
