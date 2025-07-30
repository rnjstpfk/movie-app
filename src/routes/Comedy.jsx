import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const API_KEY = 'b0a9c9bb4ee8de9c553eb84f40f4e3d1';

const Comedy = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: { api_key: API_KEY, with_genres: 35, language: 'ko-KR', page: 1 }
      })
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error('❌ 코미디 API 호출 오류:', err);
        setError('코미디 영화 목록을 불러올 수 없습니다.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comedyPage">
      <h2>코미디 영화</h2>
      <div className="movieList">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type="comedy" />
        ))}
      </div>
    </div>
  );
};

export default Comedy;
