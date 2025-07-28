import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

const MoviesDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [m, setM] = useState(null);

    useEffect (() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko`).then(res => {
            setM(res.data);
            setIsLoading(false);
        })
        
    }, [id]);

    return (
        <div className='moviesDetail'> 
            {
                isLoading ? (<div>Loading...</div>):(
                    <div className='movie'>
                        <div className="movieBox">
                            <img src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`} alt={m.title} />
                        </div>
                        <div className="textBox">
                            <div className="textBoxtTitle">{m.title}</div>
                            <div className="textBoxtOriginal_title">{m.original_title}</div>
                            <div className="textBoxtOverview">{m.overview}</div>
                            <div className="textBoxtRelease_date">개봉일 : {m.release_date}</div>
                            <div className="textBoxtVote_average">평점 : ⭐{m.vote_average}</div>
                            <div className="textBoxtVote_count">좋아요 : ❤️{m.vote_count}</div>
                            <div className="textBoxtPopularity">인기도 : {m.popularity}</div>
                            <div className="textBoxtStatus">상태 : {m.status}</div>
                            <div className="textBoxtTagline">태그라인 : {m.tagline}</div> 
                            <div className="textBoxtGenres">
                                {m.genres && m.genres.map((genre) => (
                                    <span key={genre.id} className="textBoxtGenre">{genre.name}</span>
                                ))}
                            </div>   
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MoviesDetail;