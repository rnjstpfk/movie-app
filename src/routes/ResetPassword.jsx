import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./styles/reset-password.scss"; // ✅ 하나만 남기고, 경로도 올바르게

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📩 비밀번호 재설정 링크가 이메일로 전송되었습니다.");
      setEmail("");
    } catch (error) {
      alert("❌ 비밀번호 재설정 실패: " + error.message);
    }
  };

  return (
    <div className="resetPage">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">재설정 메일 보내기</button>
      </form>
      <p><Link to="/login">로그인으로 돌아가기</Link></p>
    </div>
  );
}
