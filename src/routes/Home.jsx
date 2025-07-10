import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Recommendations from '../components/Recommendations'


const Home = () => {
    /* b0a9c9bb4ee8de9c553eb84f40f4e3d1 */
    const [upComingMovies, setUpcomingMovies] = useState([]);
    const [appMovies, setAppMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleMovies, setVisibleMovies] = useState(5);
    const [searchWord, setSearchWord] = useState('');
    const [randomMovie, setRandomMovie] = useState(null);

    const search = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko&query=${searchWord}`)
            .then((res) => {
                console.log(res.data.results);
                setAppMovies(res.data.results);
            })
            .catch((error) => {
                console.error("검색 중 오류 발생:", error);
            });
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }
    const getMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko`);

            const appResponse = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko`);

            /* setAppMovies(response.data.results); */
            setAppMovies(appResponse.data.results);
            /* console.log(response.data.results); */
            /* console.log(appResponse.data.results); */
            setUpcomingMovies(response.data.results);

            const movies = response.data.results;
            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                setRandomMovie(movies[randomIndex]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    /* const getRandomMovie = () => {
        if (upComingMovies.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * upComingMovies.length);
        return upComingMovies[randomIndex];
    } */
    /* const randomMovie = getRandomMovie(); */
    return (
        <div className='home'>
            <div className="upComing">
                {
                    isLoading ? (
                        <p className='loading'>Loading...</p>
                    ) : (
                        <div className="upMovie">
                            <div className="upComingImg">
                                {randomMovie && <img src={`https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`} alt={randomMovie.title} />}
                            </div>
                            <div className="upComingInfo">
                                <div className="upInfoText">
                                    <p className="title">{randomMovie.title}</p>
                                    <p className="original_title"> {randomMovie.original_title}</p>
                                    <p className="overview">개요: {randomMovie.overview}</p>
                                    <p className="release_date">개봉일: {randomMovie.release_date}</p>
                                    <p className="vote_average">평점: {randomMovie.vote_average}</p>
                                    <p className="vote_count">좋아요: {randomMovie.vote_count}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="search">
                <div className="searchBox">
                    <input type="search" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress} placeholder='영화제목을 입력해주세요.' />
                    <button className='searchBtn' onClick={search}><IoSearch className='searchIcon' /></button>
                </div>
                <div className="searchResults">
                    <ul className="searchMovieList">

                    </ul>
                </div>
            </div>

            <div className="mainUpComing">
                <h2>상영작</h2>
                <div className="movieList">
                    {isLoading ? (<p className='loading'>로딩중...</p>) : (appMovies.slice(0, visibleMovies).map((movie) => (
                        <div className="movieItem" key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <div className="imgWrap"><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></div>
                                <div className="textWrap">
                                    <h3>{movie.title}</h3>
                                    <p>개봉일: {movie.release_date}</p>
                                    <p className='average'>{movie.vote_average}</p>
                                </div>
                            </Link>
                        </div>
                    )))}

                </div>
                {
                    appMovies.length > visibleMovies && (
                        <div className="more">
                            <button className='loadMore' onClick={() => setVisibleMovies(visibleMovies + 5)}>
                                더보기
                            </button>
                        </div>
                    )
                }
            </div>

            <Recommendations /> 
        </div>
    );
};

export default Home;