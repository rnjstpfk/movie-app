import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    </div>
  );
};

export default Detail;
