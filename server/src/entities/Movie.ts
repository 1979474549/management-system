import { IsNotEmpty, ArrayMinSize, MinLength, MaxLength, Min, Max, IsInt, IsArray, validate } from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import "reflect-metadata";
import { IMovie } from '../db/MovieSchema';
import { BaseFun } from './BaseFun';

export class Movie extends BaseFun{
    @IsNotEmpty({message: '电影名称不得为空'})
    @Type(() => String)
    public name: string;

    @IsNotEmpty({message: '电影类型不得为空'})
    @ArrayMinSize(1, {message: '电影类型不得为空'})
    @Type(() => String)
    @IsArray({message: '必须为数组'})
    public types: string[];

    @IsNotEmpty({message: '上映地区不得为空'})
    @ArrayMinSize(1, {message: '上映地区不得为空'})
    @Type(() => String)
    @IsArray({message: '必须为数组'})
    public areas: string[];

    @IsNotEmpty({message: '电影时常不得为空'})
    @Min(1, {message: '电影时长异常'})
    @Max(999, {message: '电影时长异常'})
    @IsInt({message: '电影时长异常'})
    public timeLong: number;

    @IsNotEmpty({message: '是否热映不得为空'})
    public isHot: boolean = false;

    @IsNotEmpty({message: '是否即将上映不得为空'})
    public isComming: boolean = false;

    @IsNotEmpty({message: '是否经典不得为空'})
    public isClassic: boolean = false;

    public description?: string;

    public poster: string;

    public static transformer(plainObj: object) {
        return super.transformer2(Movie, plainObj);
    }
}