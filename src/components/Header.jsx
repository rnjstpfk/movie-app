import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SiThemoviedatabase } from "react-icons/si";
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
    const activeStyle = { color: 'pink' };
    const [userNickname, setUserNickname] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Firebase Auth 상태 감지
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                // Firestore에서 닉네임 가져오기
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserNickname(userDoc.data().nickname);
                } else {
                    setUserNickname("사용자");
                }
            } else {
                setUserNickname(null);
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // 로그아웃 처리
    const handleLogout = async () => {
        await signOut(auth);
        alert('로그아웃되었습니다.');
        setUserNickname(null);
        setUserId(null);
    };

    return (
        <header className='header'>
            <h1 className='logo'>
                <Link to="/"><SiThemoviedatabase /></Link>
            </h1>
            <nav>
                <ul>
                    <li><NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink></li>
                    <li><NavLink to="/drama" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Drama</NavLink></li>
                    <li><NavLink to="/comedy" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Comedy</NavLink></li>
                </ul>
            </nav>

            <div className="loginBox">
                {userNickname ? (
                    <>
                        <span className="welcome">{userNickname}님</span>
                        <Link to="/mypage" className="mypageLink">마이페이지</Link> {/* ✅ 유지 */}
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <Link to="/login" className="loginBtn">로그인</Link>
                )}
            </div>

        </header>
    );
};

export default Header;
