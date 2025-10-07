import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [newNickname, setNewNickname] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_API_KEY;

  // ✅ 로그인 상태 확인 및 사용자 정보/즐겨찾기 불러오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 🔹 사용자 정보 가져오기
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData({ id: user.uid, ...userDoc.data() });
          setNewNickname(userDoc.data().nickname);
        }

        // 🔹 즐겨찾기 영화 ID 가져오기
        const favDoc = await getDoc(doc(db, "favorites", user.uid));
        if (favDoc.exists()) {
          const ids = favDoc.data().movies || [];
          const fetchedMovies = [];
          for (const id of ids) {
            try {
              const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
              );
              fetchedMovies.push(res.data);
            } catch (err) {
              console.error('영화 정보 로드 실패', err);
            }
          }
          setFavorites(fetchedMovies);
        }
      } else {
        alert('로그인 후 이용 가능합니다.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, API_KEY]);

  // ✅ 닉네임 변경 처리
  const handleNicknameUpdate = async () => {
    if (!newNickname.trim()) {
      alert('닉네임을 입력하세요.');
      return;
    }
    try {
      await updateDoc(doc(db, "users", userData.id), { nickname: newNickname });
      alert('닉네임이 변경되었습니다.');
      setUserData({ ...userData, nickname: newNickname });
    } catch (error) {
      console.error(error);
      alert('닉네임 변경 실패');
    }
  };

  if (!userData) return <div className="authPage"><h2>정보 불러오는 중...</h2></div>;

  return (
    <div className="mypage">
      <h2>마이페이지</h2>

      {/* ✅ 사용자 정보 */}
      <div className="userInfo">
        <p><strong>이메일:</strong> {userData.email}</p>
        <p><strong>가입일:</strong> {userData.createdAt?.toDate ? userData.createdAt.toDate().toLocaleDateString() : '정보 없음'}</p>
        
        <div className="nicknameBox">
          <input 
            type="text" 
            value={newNickname} 
            onChange={(e) => setNewNickname(e.target.value)} 
          />
          <button onClick={handleNicknameUpdate}>닉네임 변경</button>
        </div>
      </div>

      {/* ✅ 즐겨찾기 영화 목록 */}
      <h3>내가 찜한 영화</h3>
      {favorites.length === 0 ? (
        <p>아직 찜한 영화가 없습니다.</p>
      ) : (
        <div className="favoritesList">
          {favorites.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="favItem">
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
              <h4>{movie.title}</h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
