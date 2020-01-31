import { IMovie } from "../db/MovieSchema";
import { Movie } from "../entities/Movie";
import { MovieModel } from "../db";
import { IScondition } from "../entities/IsCondition";
import { ISearchReault } from "../entities/types";


export class MovieService {
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 数据转换
        const newMovie = Movie.transformer(movie);
        // 数据验证
        const error = await newMovie.validatorThis(false);
        if(error.length > 0) {
            return error;
        }
        // 添加数据
        const result = await MovieModel.create(newMovie);
        return result;
    }
    public static async edit(id: string, movie: Movie): Promise<string[]> {
        // 数据转换
        const newMovie = Movie.transformer(movie);
        // 数据验证
        const error = await newMovie.validatorThis(true);
        if(error.length > 0) {
            return error;
        }
        //修改数据
        await MovieModel.updateOne({_id: id}, movie);
        return error;
    }
    public static async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({_id: id})
    }
    public static async findById(id: string): Promise<IMovie | null> {
        return  await MovieModel.findById(id);
    }
    public static async find(condition: IScondition): Promise<ISearchReault<IMovie>> {
        // 数据转换
        const newCondition = IScondition.transformer(condition);
        // 数据验证
        const error = await newCondition.validatorThis(true);
        if(error.length > 0) {
            return {
                data: [],
                count: 0,
                error
            }
        }
        //查询
        const data = await MovieModel.find({
            name: {$regex: new RegExp(newCondition.key)}
        }).skip((newCondition.page - 1) * newCondition.limit).limit(newCondition.limit);
        const count = await MovieModel.find({
            name: {$regex: new RegExp(newCondition.key)}
        }).countDocuments();
        return {
            data,
            count,
            error: []
        }
    }
}