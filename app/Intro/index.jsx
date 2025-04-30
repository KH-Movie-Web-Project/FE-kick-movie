import React from "react";
import { useNavigate } from "react-router-dom";
import "./intro.css"

const IntroPage = () => {
    const navigate = useNavigate();
  
    return (
      <div className="intro-section">
        <h1 className="intro-title">환영합니다!</h1>
        <p className="intro-desc">Kick-Movie와 함께 당신의 영화 여행을 시작하세요.</p>
        <button className="start-btn" onClick={() => navigate('/')}>지금 시작하기</button>
      </div>
    );
  };
  
  export default IntroPage;