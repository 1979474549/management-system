import React from 'react';
import { RouteComponentProps } from 'react-router';
import AddMovieForm from '../components/AddMovieForm';
import { MovieService } from '../services/MovieService';
import { IMovie } from '../services/commonType';
type props = {
    id: string
}
interface IEditMovieState {
    movie: Partial<IMovie>
}
export class EditMovie extends React.Component<RouteComponentProps<props>, IEditMovieState> {
    state: IEditMovieState = {
        movie: {}
    }
    async componentDidMount() {
        const resp = await MovieService.findById(this.props.match.params.id);
        if(resp.data) {
            this.setState({
                movie: resp.data
            })
        }
    }
    render() {
        return (
            <AddMovieForm movie={this.state.movie} onSubmit={ async (movie: IMovie) => {
                const resp =  await MovieService.edit(this.props.match.params.id, movie);
                if(resp.code !== 1) {
                    return resp.err
                }
                return '';
            }} />
        )
    }
}