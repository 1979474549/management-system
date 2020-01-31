import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export abstract class BaseFun {
    public async validatorThis(isSkip: boolean): Promise<string[]> {
        const error = await validate(this, {
            skipUndefinedProperties: isSkip
        });
        const temp = error.map(item => Object.values(item.constraints));
        const result: string[] = [];
        temp.forEach(item => {
            result.push(...item);
        })
        return result;
    }

    public static transformer2<T>(cls: new (...args) => T, plainObj: object): T {
        if(plainObj instanceof cls) {
            return plainObj;
        }
        return plainToClass(cls, plainObj);
    }
}