"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

import "./detailpage.css";

export default function DetailPage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");
  const [movieDetail, setMovieDetail] = useState();
  const [actors, setActors] = useState([]);
  const [imageCount, setImageCount] = useState(10);
  const [circleColor, setCircleColor] = useState();
  const actorListRef = useRef(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async (movieId) => {
      const url = `http://localhost:8080/api/movie?movieId=${movieId}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("영화 상세정보 불러오기 실패");
        }

        const data = await response.json();
        console.log("영화 데이터:", data);
        setMovieDetail(data.movieDetailInfoDTO);
        setActors(data.movieActorDTOList);
      } catch (error) {
        console.error("영화 정보를 불러오지 못했습니다:", error);
      }
    };

    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    if(movieDetail && movieDetail.voteAverage > 2) {
      setCircleColor("red")
    } if(movieDetail && movieDetail.voteAverage > 5) {
      setCircleColor("yellow")
    } if(movieDetail && movieDetail.voteAverage > 8) {
      setCircleColor("green")
      
    } 
  })

  if (!movieDetail) return <div>로딩 중...</div>;

  return (
    <>
      {/* 영화 상세정보 영역 */}
      <div className="movie_section">
        {/* 포스터 */}
        <img
          className="movie_poster"
          src={`http://image.tmdb.org/t/p/w342/${movieDetail.posterPath}`}
        />

        {/* 영화 정보 영역 */}
        <div className="movie_details">
          <h1 className="movie_title">{movieDetail.title}</h1>

          <div id="movie_detail_info">
            <strong id="release">개봉일: {movieDetail.releaseDate}</strong>
            
            <strong id="genre">장르:</strong>
            {movieDetail.genres?.map((genre, index) => (
              <strong key={index}>
                <strong id="genre-item">{genre.name}</strong>
                {index < movieDetail.genres.length - 1 && ", "}
              </strong>
            ))}
            
            <strong id="runtime">러닝타임: {movieDetail.runtime}분</strong> 
          </div>

          <div className="movie_info">
            <div className="movie_overview">{movieDetail.overview}</div>
          </div>
          <div className="movie_cast_preview">
          <h3 id="actor-main">출연진</h3>
            <div className="cast_scroll">
              {actors.slice(0, 10).map((actor, index) => (
                <div key={index} className="actor_item">
                  <img
                    // height={300}
                    // width={200}
                    src={`http://image.tmdb.org/t/p/w185/${actor.profilePath}`}
                    alt={actor.name}
                    className="actor_image"
                  />
                  <span id="actor_name">{actor.name}</span>
                  <span id="actor_character">({actor.character})</span>
                </div>
              ))}
            </div>
        </div>
        </div>
      </div>

      {/* 영화사진, 유저평점영역 */}
      <div className="trailer_vote_wrapper">
        <div className="trailer_section">
          <img 
            className="trailer_placeholder"
            src={`http://image.tmdb.org/t/p/original/${movieDetail.backdropPath}`}
          />
        </div>

        {/* 유저평점 평균 영역 */}
        <div className="vote_stat_wrapper">
          <div className="vote_average">
            <div className="box">
              <p className="text_average">평균평점</p>
              <p className="text_count">투표 수</p>
            </div>
            <div className={`vote_circle_${circleColor}`}>
                <span className="vote_text">{movieDetail.voteAverage}</span>
            </div>
            <div className="vote_count">
              {movieDetail.voteCount}명
            </div>
          </div>

          {/* 영화 상태표시 영역 */}
          <div className="movie_stat">
            <div className="original_title">
              <h3>원래제목</h3>
              <p>{movieDetail.originalTitle}</p>
            </div>
            <div className="status">
              <h3>상태</h3>
              <p>{movieDetail.status}</p>
            </div>
            <div className="budget">
              <h3>제작비</h3>
              <p>${movieDetail.budget}</p>
            </div>
            <div className="revenue">
              <h3>수익</h3>
              <p>${movieDetail.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 배우 목록 */}
      <h2 className="actor_title">출연진 상세정보</h2>
      <div className="actors_list" ref={actorListRef}>
        {actors.slice(0, imageCount).map((actor, index) => (

          <div key={index} className="actor_item">
            <img
              // height={300} width={300}
              src={actor.profilePath ? `https://image.tmdb.org/t/p/w200${actor.profilePath}` : '/icons/default-image.jpg'}
              alt={actor.name}
              className="actor_image"
            />
            <span id="actor_name">{actor.name}</span>
            <span id="actor_character">({actor.character})</span>
          </div>
        ))}
        <button 
          onClick={() => {
            setImageCount(prev => prev + 10)
            console.log(imageCount)
          }}
          className="imageAdd">
            + 더보기
        </button>
      </div>
    </>
  );
}