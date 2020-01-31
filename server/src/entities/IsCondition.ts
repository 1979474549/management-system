import { Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseFun } from "./BaseFun";

export class IScondition extends BaseFun{
    @Min(1, {message: '当前页不得小于1'})
    @Type(() => Number)
    page: number = 1
    @Min(5, {message: "每页内容不得少于5页"})
    @Type(() => Number)
    limit: number = 10

    @Type(() => String)
    key: string = ''
    public static transformer(plainObj: object) {
        return super.transformer2(IScondition, plainObj);
    }
}