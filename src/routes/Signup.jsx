import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (password !== confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // ✅ Firebase Auth 회원가입
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        nickname: nickname,
        createdAt: new Date()
      });

      alert('회원가입 완료! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      console.error("회원가입 에러:", error.code, error.message);

      // ✅ 에러 코드별 안내
      if (error.code === 'auth/email-already-in-use') {
        if (window.confirm('이미 가입된 이메일입니다. 로그인 페이지로 이동하시겠습니까?')) {
          navigate('/login');
        }
      } else if (error.code === 'auth/invalid-email') {
        alert('올바른 이메일 형식을 입력하세요.');
      } else {
        alert('회원가입 실패: ' + error.message);
      }
    }
  };

  return (
    <div className="signupPage">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="닉네임" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="비밀번호 (6자 이상)" 
          value={password} 
          onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} 
          required 
        />
        {passwordError && <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>}
        <input 
          type="password" 
          placeholder="비밀번호 확인" 
          value={confirm} 
          onChange={(e) => setConfirm(e.target.value)} 
          required 
        />
        <button type="submit">회원가입</button>
      </form>
      <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
    </div>
  );
};

export default Signup;
