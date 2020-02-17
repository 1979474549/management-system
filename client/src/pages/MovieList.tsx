
import MovieTable, { IMovieTable } from '../components/MovieTable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MovieActions, { MovieAction } from '../redux/actions/MovieActions';
import { IMovieState } from '../redux/reducers/MovieReducer';
import { switchType } from '../services/commonType';

function mapStateToProps(state: IMovieState) {
    return state;
}
function mapDispatchToProps(dispatch: Dispatch<MovieAction>): IMovieTable {
    return {
        onLoad: () => {
            dispatch(MovieActions.fetchMovies({
                page: 1,
                key: '',
                limit: 5
            }) as any)
        },
        handleChange: (id: string, type: switchType, nextState: boolean) => {
            dispatch(MovieActions.switchChange(id, type, nextState) as any);
        },
        handleDelete: async (id: string) => {
            await dispatch(MovieActions.deleteMovie(id) as any);
            await dispatch(MovieActions.fetchMovies({}) as any)
        },
        pageChange: async (nextPage: number) => {
            await dispatch(MovieActions.fetchMovies({
                page: nextPage
            })as any)
        },
        keyChange: (key) => {
            dispatch(MovieActions.setConditionAction({
                key
            }))
        },
        handleSearch: async (key) => {
            await dispatch(MovieActions.fetchMovies({
                page: 1,
                key
            }) as any)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieTable); 