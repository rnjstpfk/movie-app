import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Recommendations from '../components/Recommendations';

const API_KEY = "b0a9c9bb4ee8de9c553eb84f40f4e3d1";
const TMDB_BASE = "https://api.themoviedb.org/3";

const Home = () => {
  const [upComingMovies, setUpcomingMovies] = useState([]);
  const [appMovies, setAppMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMovies, setVisibleMovies] = useState(5);
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  // 🔍 영화 검색
  const search = async () => {
    if (!searchWord.trim()) return;
    try {
      const res = await axios.get(`${TMDB_BASE}/search/movie`, {
        params: { api_key: API_KEY, language: 'ko', query: searchWord }
      });
      setSearchResults(res.data.results);
    } catch (error) {
      console.error("❌ 검색 중 오류 발생:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') search();
  };

  // 🎬 영화 데이터 가져오기
  const getMovies = async () => {
    try {
      const upcomingRes = await axios.get(`${TMDB_BASE}/movie/upcoming`, {
        params: { api_key: API_KEY, language: 'ko' }
      });
      const nowPlayingRes = await axios.get(`${TMDB_BASE}/movie/now_playing`, {
        params: { api_key: API_KEY, language: 'ko' }
      });

      setUpcomingMovies(upcomingRes.data.results);
      setAppMovies(nowPlayingRes.data.results);

      // 랜덤 추천 영화
      const movies = upcomingRes.data.results;
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      }
    } catch (error) {
      console.error("❌ 영화 데이터 불러오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="home">
      {/* 🎬 랜덤 추천 영화 */}
      <div className="upComing">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          randomMovie && (
            <div className="upMovie">
              <div className="upComingImg">
                <img src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`} alt={randomMovie.title} />
              </div>
              <div className="upComingInfo">
                <div className="upInfoText">
                  <p className="title">{randomMovie.title}</p>
                  <p className="original_title">{randomMovie.original_title}</p>
                  <p className="overview">개요: {randomMovie.overview}</p>
                  <p className="release_date">개봉일: {randomMovie.release_date}</p>
                  <p className="vote_average">평점: {randomMovie.vote_average}</p>
                  <p className="vote_count">좋아요: {randomMovie.vote_count}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* 🔍 검색 */}
      <div className="search">
        <div className="searchBox">
          <input
            type="search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="영화제목을 입력해주세요."
          />
          <button className="searchBtn" onClick={search}>
            <IoSearch className="searchIcon" />
          </button>
        </div>

        {/* 검색 결과 */}
        {searchResults.length > 0 && (
          <div className="searchResults">
            <ul className="searchMovieList">
              {searchResults.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 🎬 현재 상영작 */}
      <div className="mainUpComing">
        <h2>상영작</h2>
        <div className="movieList">
          {isLoading ? (
            <p className="loading">로딩중...</p>
          ) : (
            appMovies.slice(0, visibleMovies).map((movie) => (
              <div className="movieItem" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <div className="imgWrap">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  </div>
                  <div className="textWrap">
                    <h3>{movie.title}</h3>
                    <p>개봉일: {movie.release_date}</p>
                    <p className="average">{movie.vote_average}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {appMovies.length > visibleMovies && (
          <div className="more">
            <button className="loadMore" onClick={() => setVisibleMovies(visibleMovies + 5)}>
              더보기
            </button>
          </div>
        )}
      </div>

      <Recommendations />
    </div>
  );
};

export default Home;
