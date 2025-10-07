import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DramaDetail = () => {
    const { id } = useParams(); // URL 파라미터 가져오기
    const [drama, setDrama] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/tv/${id}?api_key=b0a9c9bb4ee8de9c553eb84f40f4e3d1&language=ko-KR`
            )
            .then((res) => {
                setDrama(res.data);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <div className="loading">불러오는 중...</div>;
    if (!drama) return <div>해당 드라마 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="dramaDetailPage">
            <img
                src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`}
                alt={drama.name}
            />
            <div className="dramaInfo">
                <h2>{drama.name}</h2>
                <p><strong>줄거리:</strong> {drama.overview || '정보 없음'}</p>
                <p><strong>방영일:</strong> {drama.first_air_date}</p>
                <p><strong>평점:</strong> {drama.vote_average}</p>
                <p><strong>인기도:</strong> {drama.popularity}</p>
            </div>
        </div>

    );
};

export default DramaDetail;
