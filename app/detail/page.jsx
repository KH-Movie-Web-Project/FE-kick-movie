"use client";
import { useEffect, useState } from "react";

import "./detailpage.css";
import Image from "next/image";

export default function DetailPage() {
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const movieId = "22"; // 예시 movieId
    const fetchMovie = async (movieId) => {
      const url = `http://localhost:8080/api/movie?movieId=${movieId}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("영화 상세정보 불러오기 실패");
        }

        const data = await response.json();
        console.log("영화 데이터:", data);
        setMovieData(data);
      } catch (error) {
        console.error("영화 정보를 불러오지 못했습니다:", error);
      }
    };

    fetchMovie(movieId);
  }, []);

  if (!movieData) return <div>로딩 중...</div>;

  return (
    <>
      {/* 영화 상세정보 영역 */}
      <div className="movie_section">
        {/* 포스터 */}
        <img
          className="movie_poster"
          // src={`http://image.tmdb.org/t/p/w185/${movieData.posterPath}`}
        />

        {/* 영화 정보 영역 */}
        <div className="movie_details">
          <h1 className="movie_title">{movieData.title}</h1>
          <span id="movie_detail_info">
            <strong>개봉일:</strong> 
            {movieData.releaseDate ? movieData.releaseDate : '정보 없음'}

              {/* <strong>장르:</strong> {movieData.genres?.join(", ")} */}
              {/* <strong>러닝타임:</strong> {movieData.runTime}분 */}
          </span>

          <div className="movie_info">
            <div className="movie_like">❤</div>
            <div className="movie_overview">{movieData.overview}</div>
          </div>
        </div>
      </div>

      {/* 영화사진, 유저평점영역 */}
      <div className="trailer_vote_wrapper">
        <div className="trailer_section">
          {/* <div className="trailer_placeholder">{movieData.backDropPath}</div> */}
        </div>

        {/* 유저평점 평균 영역 */}
        <div className="vote_stat_wrapper">
          <div className="vote_average">
            <h2>
              {movieData.voteAverage} / {movieData.voteCount}명
            </h2>
          </div>

          {/* 영화 상태표시 영역 */}
          <div className="movie_stat">
            <div className="original_title">
              <h3>원래제목</h3>
              <p>{movieData.originalTitle}</p>
            </div>
            <div className="status">
              <h3>상태</h3>
              <p>{movieData.status}</p>
            </div>
            <div className="budget">
              <h3>제작비</h3>
              <p>${movieData.budget}</p>
            </div>
            <div className="revenue">
              <h3>수익</h3>
              <p>${movieData.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 배우 목록 */}
      <h2 className="actor_title">출연진</h2>
      <div className="actors_list">
        {movieData.actors?.map((actor, index) => (
          <div key={index} className="actor_item">
            <Image height={300} width={300}
              src={`http://image.tmdb.org/t/p/w185/${actor.profilePath}`}
              alt={actor.name}
              className="actor_image"
            />
            <p id="actor_name">{actor.name}</p>
            <p id="actor_character">({actor.character})</p>
          </div>
        ))}
      </div>
    </>
  );
}
