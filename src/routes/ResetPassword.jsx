import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import './styles/reset-password.scss';

=======
>>>>>>> e956e93e5647a93c0b67a395b223fff01522b8ce

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📩 비밀번호 재설정 링크가 이메일로 전송되었습니다.");
    } catch (error) {
      alert("❌ 비밀번호 재설정 실패: " + error.message);
    }
  };

  return (
    <div className="resetPage">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleReset}>
        <input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">재설정 메일 보내기</button>
      </form>
      <p><Link to="/login">로그인으로 돌아가기</Link></p>
    </div>
  );
};

export default ResetPassword;
