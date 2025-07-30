import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'b0a9c9bb4ee8de9c553eb84f40f4e3d1';
const TMDB_BASE = 'https://api.themoviedb.org/3';

const ComedyDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('잘못된 영화 ID입니다.');
      setIsLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${TMDB_BASE}/movie/${id}`, {
          params: { api_key: API_KEY, language: 'ko-KR' }
        });
        setMovie(res.data);
      } catch (err) {
        console.error('❌ ComedyDetail API 오류:', err.response?.status, err.response?.data);
        setError('영화 정보를 불러올 수 없습니다. (404)');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) return <div className="loading">불러오는 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div>해당 영화 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="comedyDetailPage">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image.jpg'}
        alt={movie.title}
      />
      <div className="movieInfo">
        <h2>{movie.title}</h2>
        <p><strong>줄거리:</strong> {movie.overview || '정보 없음'}</p>
        <p><strong>개봉일:</strong> {movie.release_date}</p>
        <p><strong>평점:</strong> {movie.vote_average}</p>
        <p><strong>인기도:</strong> {movie.popularity}</p>
      </div>
    </div>
  );
};

export default ComedyDetail;
