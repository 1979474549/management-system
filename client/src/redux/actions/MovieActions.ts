import { IAction } from "./ActionTypes";
import { IMovie, ICondition } from "../../services/commonType";
import { ThunkAction } from 'redux-thunk';
import { IMovieState } from "../reducers/MovieReducer";
import { MovieService } from "../../services/MovieService";

export type SetMovieAction = IAction<'set_movieAction', {
    movies: IMovie[],
    total: number
}>;

function setMovieAction(movies: IMovie[], total: number): SetMovieAction {
    return {
        type: 'set_movieAction',
        payLoad: {
            movies,
            total
        }
    }
}
export type SetLoadingAction = IAction<'set_LoadingAction', boolean>;
function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: 'set_LoadingAction',
        payLoad: isLoading
    }
}

export type SetConditionAction = IAction<'set_ConditionAction', ICondition>;
function setConditionAction(condition: ICondition): SetConditionAction {
    return {
        type: 'set_ConditionAction',
        payLoad: condition
    }
}

export type DeleteAction = IAction<'deleteAction', string>;
function deleteAction(id: string): DeleteAction {
    return {
        type: 'deleteAction',
        payLoad: id
    }
}


function fetchMovies(condition: ICondition): ThunkAction<Promise<void>, IMovieState, any, MovieAction> {
    return async (dispatch, getState) => {
        //1.设置加载状态
        dispatch(setLoadingAction(true));
        //2.设置条件
        dispatch(setConditionAction(condition));
        //3.查询电影
        const result = await MovieService.find(getState().condition);
        //4.设置电影
        dispatch(setMovieAction(result.data, result.total));
        //关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

function deleteMovie(id: string): ThunkAction<Promise<void>, IMovieState, any, MovieAction> {
    return async dispatch => {
        dispatch(setLoadingAction(true));
        await MovieService.delete(id);
        dispatch(deleteAction(id));
        dispatch(setLoadingAction(false));
    }
}



export type MovieAction = SetMovieAction | SetLoadingAction | SetConditionAction | DeleteAction;
export default {
    setMovieAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie
}




