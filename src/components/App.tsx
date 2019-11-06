import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import './App.css';
import Header from './Header';
import Search from './Search';
import Movie, { MovieModel } from './Movie';

const API_KEY = 'd9bf4922';
const MOVIE_API_URL = `http://www.omdbapi.com/?s=man&apikey=${API_KEY}`;

type MovieResponse = {
  Search: MovieModel[];
  Error: string;
  Response: string;
};

const getMovies$ = (url: string): Observable<MovieResponse> =>
  ajax.getJSON<MovieResponse>(url);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getMovies$(MOVIE_API_URL).subscribe(({ Search }) => {
      setMovies(Search);
      setLoading(false);
    });
  }, []);

  const search = (searchValue: string) => {
    const searchURL = `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
    setLoading(true);
    setErrorMessage('');

    getMovies$(searchURL).subscribe(({ Response, Search: s, Error: e }) => {
      if (Response === 'True') {
        setMovies(s);
        setLoading(false);
        return;
      }

      setErrorMessage(e);
      setLoading(false);
    });
  };

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
