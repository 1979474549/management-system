import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieActions';

ReactDOM.render(<App />, document.getElementById('root'));



store.dispatch(MovieAction.fetchMovies({
    key: ''
}) as any)

