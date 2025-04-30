"use client";
import React, { useEffect, useState } from "react";
import './section1.css';

const ImageCircle = ({ sortType}) => {
  const [leftImages,setLeftImages] = useState([]); 
  const [rightImages, setRightImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl = "http://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/open-api/now"
        );
        const data = await response.json();
        
        const originalAllImages = data.results.map((movie) => ({
          src: `${baseUrl}${movie.poster_path}`,
          desc: movie.title,
        }));
        setRightImages(originalAllImages.slice(6,20));

        let sortedData = [...data.results];
        if (sortType === "최신순") {
          sortedData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          console.log("📊 최신순 정렬 결과:", sortedData.map(m => ({
            title: m.title,
            popularity: m.release_date
          })));
        } else if (sortType === "인기순") {
          sortedData.sort((a, b) => b.popularity - a.popularity);
          console.log("📊 인기순 정렬 결과:", sortedData.map(m => ({
            title: m.title,
            popularity: m.popularity
          })));
        }

        const allImages = sortedData.map((movie) => ({
          src: `${baseUrl}${movie.poster_path}`,
          desc: movie.title,
        }));
        setLeftImages(allImages.slice(0, 6));
      } catch (error) {
        console.error("영화 데이터를 불러오지 못했습니다:", error);
      }
    };

    fetchMovies();
  }, [sortType]);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rightImages.length);
    }, 3000); // 3초마다 자동 슬라이드
    return () => clearInterval(interval);
  }, [rightImages.length]);

  return (
    <section className="section1-container">

      {/* 왼쪽: 2줄로 나누어진 6개 이미지 */}
      <section className="slide-left">
        <div className="slide-grid">
          {leftImages.map((img, idx) => (
            <div className="slide-item" key={idx}>
              <img src={img.src} className="imgs" alt={`left-${idx}`} />
              <p className="img-desc">{img.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 오른쪽: 큰 이미지 슬라이드 */}
      <section className="slide-right">
      {rightImages.length > 0 && rightImages[currentIndex] ? (
        <div className="slide-preview">
          <img
            src={rightImages[currentIndex].src}
            className="preview-img"
            alt={`right-${currentIndex}`}
          />
          <p className="img-desc1">{rightImages[currentIndex].desc}</p>
        </div>
      ) : (<p>로딩중</p>)}

        {/* 하단 썸네일 스크롤
        <div className="scroll">
          {rightImages.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={`thumb-${idx}`}
              className={`scroll-img ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div> */}
      </section>

    </section>
  );
};

export default ImageCircle;