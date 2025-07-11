"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import "./detailpage.css";

export default function DetailPage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("query");
  const [movieDetail, setMovieDetail] = useState();
  const [actors, setActors] = useState([]);
  const [imageCount, setImageCount] = useState(10);
  const [circleColor, setCircleColor] = useState();
  const actorListRef = useRef(null);

  const scrollToActors = () => {
    if (actorListRef.current) {
      actorListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
  }, [movieId]);

  const handleLoadMoreActors = () => {
    setImageCount(prev => prev + 10); // 10명씩 배우 리스트 늘리기
  };

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
      <div className="movie_section">
        <img
          className="movie_poster"
          src={`http://image.tmdb.org/t/p/w342/${movieDetail.posterPath}`}
        />

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
          <div className="actor_header_row">
          <h3 id="actor-main">출연진</h3>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <button onClick={scrollToActors} className="scroll_more_button">
                출연진 상세보기 ↓
              </button>
            </div>
            </div>
            <div className="cast_scroll">
              {actors.slice(0, 10).map((actor, index) => (
                <div key={index} className="actor_item">
                  <img
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

      <div className="trailer_vote_wrapper">
        <div className="trailer_section">
          <img 
            className="trailer_placeholder"
            src={`http://image.tmdb.org/t/p/original/${movieDetail.backdropPath}`}
          />
        </div>

        <div className="vote_stat_wrapper">
          <div className="vote_average">
            <div className="box">
              <p className="text_average">평균평점</p>
              <p className="text_count">투표 수</p>
            </div>
            <div className={`vote_circle_${circleColor}`}>
                <span className="vote_text">{Math.floor(movieDetail.voteAverage* 10)}</span>
            </div>
            <div className="vote_count">
              {movieDetail.voteCount}명
            </div>
          </div>

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

      <div className="actors_wrapper">
        <h2 className="actor_title">출연진 상세정보</h2>
        <div className="actors_list" ref={actorListRef}>
          {actors.slice(0, imageCount).map((actor, index) => (

            <div key={index} className="actor_item">
              <img
                src={actor.profilePath ? `https://image.tmdb.org/t/p/w200${actor.profilePath}` : '/icons/default-image.jpg'}
                alt={actor.name}
                className="actor_image"
              />
              <span id="actor_name">{actor.name}</span>
              <span id="actor_character">({actor.character})</span>
            </div>
          ))}
          <div className="actor_more_wrapper">
            <button className="actor_more_button" onClick={handleLoadMoreActors}>
              더보기 &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}