import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type = "drama" }) => {
  const [userId, setUserId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const favDoc = await getDoc(doc(db, "favorites", user.uid));
        if (favDoc.exists() && favDoc.data().movies?.includes(movie.id)) {
          setIsLiked(true);
        }
      }
    });
    return () => unsubscribe();
  }, [movie.id]);

  const toggleLike = async () => {
    if (!userId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    const favRef = doc(db, "favorites", userId);
    const favDoc = await getDoc(favRef);

    if (isLiked) {
      await updateDoc(favRef, { movies: arrayRemove(movie.id) });
      setIsLiked(false);
    } else {
      if (favDoc.exists()) {
        await updateDoc(favRef, { movies: arrayUnion(movie.id) });
      } else {
        await setDoc(favRef, { movies: [movie.id] });
      }
      setIsLiked(true);
    }
  };

  // ✅ type 값에 따라 라우트 결정
  const linkPath = type === "comedy" ? `/comedy/${movie.id}` : `/drama/${movie.id}`;

  return (
    <div className="movieItem">
      <Link to={linkPath}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title || movie.name} />
      </Link>
      <h3>{movie.title || movie.name || movie.original_name}</h3>

      <span className={`heartIcon ${isLiked ? 'liked' : ''}`} onClick={toggleLike}>
        {isLiked ? '❤️' : '🤍'}
      </span>
    </div>
  );
};

export default MovieCard;
