import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard'; // ✅ MovieCard 임포트

const Comedy = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&with_genres=35&language=ko-KR&page=1`)
      .then((res) => {
        setMovies(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('API 호출 오류:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading">로딩중...</div>;
  }

  return (
    <div className="comedyPage">
      <h2>코미디 영화</h2>
      <div className="movieList">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Comedy;
