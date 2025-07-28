import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ComedyDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID 추출
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko-KR`)
      .then((res) => {
        setMovie(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('상세 정보 호출 오류:', err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div className="loading">불러오는 중...</div>;
  if (!movie) return <div>해당 영화 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="comedyDetailPage">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
