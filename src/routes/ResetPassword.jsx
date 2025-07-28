import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('비밀번호 재설정 이메일이 전송되었습니다. 메일함을 확인하세요.');
    } catch (error) {
      setMessage('오류: ' + error.message);
    }
  };

  return (
    <div className="authPage">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleReset}>
        <input 
          type="email" 
          placeholder="가입한 이메일 입력" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">재설정 링크 보내기</button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      <p><Link to="/login">← 로그인 페이지로 돌아가기</Link></p>
    </div>
  );
};

export default ResetPassword;
