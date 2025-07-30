import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { nickname, email });
      alert("🎉 회원가입 성공!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("⚠️ 이미 가입된 이메일입니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("❌ 회원가입 실패: " + error.message);
      }
    }
  };

  return (
    <div className="signupPage">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">회원가입</button>
      </form>
      <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
    </div>
  );
};

export default Signup;
