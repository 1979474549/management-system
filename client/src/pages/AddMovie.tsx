import React from 'react';
import AddMovieForm from '../components/AddMovieForm';
import { IMovie } from '../services/commonType';
import { MovieService } from '../services/MovieService';
export class AddMovie extends React.Component {
    render() {
        return (
            <AddMovieForm onSubmit={async (movie: IMovie) => {
                const resp =  await MovieService.add(movie);
                if(resp.code !== 1) {
                    return resp.err
                }
                return '';
            }}>
            </AddMovieForm>
        )
    }
}