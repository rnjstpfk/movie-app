import React, { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import MovieCard from '../components/MovieCard'; // ✅ MovieCard 사용
=======
import { Link } from 'react-router-dom';
>>>>>>> 43097c9ade5d1aa67b790f98457a82b1bc134c3b

const Detail = () => {
  const [drama, setDrama] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko-KR&page=1`
      )
      .then((res) => {
        setDrama(res.data.results);
        setIsLoading(false);
<<<<<<< HEAD
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
    <div className="dramaPage">
      <h2>TV 프로그램</h2>
      <div className="movieList">
        {drama.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
=======
      });
  }, []);

  return (
    <div className="detail">
      <h2>TV 프로그램</h2>
      {isLoading ? (
        <div className="loading">로딩중...</div>
      ) : (
        <div className="dramaList">
          {drama.map((item) => (
            <Link to={`/drama/${item.id}`} key={item.id} className="dramaItem">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.name}
              />
              <h3>{item.name}</h3>
            </Link>
          ))}
        </div>
      )}
>>>>>>> 43097c9ade5d1aa67b790f98457a82b1bc134c3b
    </div>
  );
};

export default Detail;
