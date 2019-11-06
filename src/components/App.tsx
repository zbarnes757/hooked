import React, { useReducer, useEffect } from 'react';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import './App.css';
import Header from './Header';
import Search from './Search';
import Movie, { MovieModel } from './Movie';

// Types
type MovieResponse = {
  Search: MovieModel[];
  Error: string;
  Response: string;
};

type State = {
  loading: boolean;
  movies: MovieModel[];
  errorMessage: string;
};

// Setup
const API_KEY = 'd9bf4922';
const MOVIE_API_URL = `http://www.omdbapi.com/?s=man&apikey=${API_KEY}`;
const initialState: State = {
  loading: true,
  movies: [],
  errorMessage: ''
};

// Helper Functions
const getMovies$ = (url: string): Observable<MovieResponse> =>
  ajax.getJSON<MovieResponse>(url);

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

// Components
const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getMovies$(MOVIE_API_URL).subscribe(({ Search }) => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: Search
      });
    });
  }, []);

  const search = (searchValue: string) => {
    const searchURL = `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    });

    getMovies$(searchURL).subscribe(({ Response, Search, Error: e }) => {
      if (Response === 'True') {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: Search
        });
        return;
      }

      dispatch({
        type: 'SEARCH_MOVIES_FAILURE',
        error: e
      });
    });
  };

  const { movies, errorMessage, loading }: State = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
