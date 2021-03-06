import { IMovie, ICondition } from "../../services/commonType";
import {  SetMovieAction, SetLoadingAction, SetConditionAction, DeleteAction, SwitchChange } from "../actions/MovieActions";
import { Reducer } from "react";



export interface IMovieState {
    data: IMovie[];
    condition: Required<ICondition>;
    isLoading: boolean;
    total: number;
    totalPage: number
}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ''
    },
    isLoading: false,
    total: 0,
    totalPage: 0
}
const setMovie: Reducer<IMovieState, SetMovieAction> = function (state, action) {
    return {
        ...state,
        data: action.payLoad.movies,
        total: action.payLoad.total,
        totalPage: Math.ceil(action.payLoad.total / state.condition.limit)
    }
}
const setLoading: Reducer<IMovieState, SetLoadingAction> =  function (state, action){
    return {
        ...state,
        isLoading: action.payLoad
    }
}
const setCondition: Reducer<IMovieState, SetConditionAction> =  function (state, action) {
    const newState =  {
        ...state,
        condition: {
            ...state.condition,
            ...action.payLoad
        },
    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit);
    return newState;
}
const deleteState: Reducer<IMovieState, DeleteAction> =  function (state, action) {
    return {
        ...state,
        data: state.data.filter(item => item._id !== action.payLoad),
        total: state.total - 1,
        totalPage: Math.ceil(state.total - 1 / state.condition.limit)
    }
}
const switchChange = function (state: IMovieState, action: SwitchChange) {
    const movie = state.data.find(item => item._id === action.payLoad.id);
    if(!movie) {
        return state;
    }
    const newMovie = {...movie};
    newMovie[action.payLoad.type] = action.payLoad.nextState;
    const newData = state.data.map(d => {
        if(d._id === action.payLoad.id) {
            return newMovie;
        } 
        return d;
    })
    return {
        ...state,
        data: newData
    }
}

export default (state: IMovieState = defaultState, action: any) => {
    switch(action.type) {
        case 'set_movieAction':
            return setMovie(state, action);
        case 'set_LoadingAction':
            return setLoading(state, action);
        case 'set_ConditionAction':
            return setCondition(state, action);
        case 'deleteAction':
            return deleteState(state, action);
        case 'switch_change':
            return switchChange(state, action)
        default:
            return state;
    }
}
