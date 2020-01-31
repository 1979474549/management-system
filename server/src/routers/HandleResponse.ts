import { Response } from "express-serve-static-core";
import { ISearchReault } from "../entities/types";

export class HandleResponse {
    //统一响应格式

    public static sendError(error: string | string[], res: Response) {

        let err: string;
        if(Array.isArray(error)) {
            err = error.join(';');
        } else {
            err = error;
        }
        res.send({
            err,
            code: 0
        })
    }
    public static sendData(data: any, res:Response) {
        res.send({
            data,
            code: 1
        })
    }
    public static sendPage<T>(result: ISearchReault<T>, res: Response) {
        if(result.error.length > 0) {
            this.sendError(result.error, res);
        }
        else {
            res.send({
                data: result.data,
                total: result.count,
                code: 1
            });
        }
    }

}