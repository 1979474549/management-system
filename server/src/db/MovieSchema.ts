import Mongoose from 'mongoose';
import { Movie } from '../entities/Movie';

export interface IMovie extends Movie, Mongoose.Document {};

const movieSchema = new Mongoose.Schema<IMovie>({
    name: String,
    types: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isComming: Boolean,
    isClassic: Boolean,
    poster: String,
    description: String
},{ versionKey: false })

export default Mongoose.model<IMovie>('Movie', movieSchema);

