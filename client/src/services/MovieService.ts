import { IMovie, ICondition } from "./commonType";
import { ResponseErr, ResponseData, ResponsePageData } from "./SearchResult";
import axios from 'axios';

/**
 * 处理ajax请求
 */
export class MovieService {
    //添加电影
    public static async add (movie: IMovie): Promise<ResponseErr | ResponseData<IMovie>> {
        const { data } = await axios.post('/api/movie/', movie);
        
        return data;
    }   
    //修改电影
    public static async edit (id: string, movie: object): Promise<ResponseErr | ResponseData<true>> {
        const { data } = await axios.put('/api/movie/' + id, movie);
        return data;
    }  
    //删除电影
    public static async delete (id: string): Promise<ResponseErr | ResponseData<true>> {
        const { data } = await axios.delete('/api/movie/' + id);
        return data;
    }  
    //查询单个电影
    public static async findById (id: string): Promise<ResponseData<IMovie | null>> {
        const { data } = await axios.get('/api/movie/' + id);
        return data;
    } 
    //查询多个电影
    public static async find (condition: ICondition): Promise<ResponsePageData<IMovie>> {
        const { data } = await axios.get('/api/movie/', {
            params: condition
        });
        console.log(data);
        return data;
    } 
}