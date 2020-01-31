import express from 'express';
import { MovieService } from '../services/movieService';
import { HandleResponse } from './HandleResponse';

const app = express();

const router = app.use(express.Router());

router.get('/:id', async (req, res) => {
    try {
        const result = await MovieService.findById(req.params.id);
        HandleResponse.sendData(result, res);
    } catch (e) {
        HandleResponse.sendData(null, res);
    }
})
router.get('/', async (req, res) => {
    const result = await MovieService.find(req.query);
    HandleResponse.sendPage(result, res);
})
router.post('/', async (req, res) => {
    //添加电影

    const result = await MovieService.add(req.body);
    if (Array.isArray(result)) {
        HandleResponse.sendError(result, res);
    } else {
        HandleResponse.sendData(result, res);
    }

})
router.put('/:id', async (req, res) => {
    try {
        const result = await MovieService.edit(req.params.id, req.body);
        if (result.length > 0) {
            HandleResponse.sendError(result, res);
        } else {
            HandleResponse.sendData(true, res);
        }
    } catch (e) {
        HandleResponse.sendError('id错误', res);
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await MovieService.delete(req.params.id);
        HandleResponse.sendData(true, res);
    } catch (e) {
        HandleResponse.sendError('id错误', res);
    }
})
export default router;
