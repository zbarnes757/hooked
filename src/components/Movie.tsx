import React from 'react';

export type MovieModel = {
  Poster: string;
  Title: string;
  Year: string;
};

type MovieProps = {
  movie: MovieModel;
};

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie: React.FC<MovieProps> = ({ movie: { Poster, Title, Year } }) => {
  const poster = Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : Poster;

  return (
    <div className="movie">
      <h2>{Title}</h2>
      <div>
        <img src={poster} alt={`The movie titled: ${Title}`} width="200" />
      </div>
      <p>{Year}</p>
    </div>
  );
};

export default Movie;
