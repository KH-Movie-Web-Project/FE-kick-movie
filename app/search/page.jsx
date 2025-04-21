"use client";

import { useState } from "react";
import SearchPost from "../../components/SearchPost";
import img1 from "../../public/testimg/post.png";
import "./SearchPage.css"

const dummy = [
  {
    poster:img1,
    title:"어벤저스: 인피니티 워",
    date:"2025 03 04",
    detail:"영화 내용에 대한 간략한 설명 100글자가 넘어간다면 자동으로 자르고 뒤에 ...을 붙여주는 기능 구현 예정 글씨 크기나 사이즈도 세부 조절 필요한 것으로 보임 글씨가 늘어날 경우 스코어 보드에 딱 붙어버리는 문제 발생 역시 수정해야 함 영화 내용에 대한 간략한 설명 100글자가 넘어간다면 자동으로 자르고 뒤에 ...을 붙여주는 기능 구현 예정 글씨 크기나 사이즈도 세부 조절 필요한 것으로 보임 글씨가 늘어날 경우 스코어 보드에 딱 붙어버리는 문제 발생 역시 수정해야 함",
    score:67,
  },
  {
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:49,
  },
  {
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:91,
  },
  {
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },
  {
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },{
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  },

]

export default function searchPage(){

  const [postCount,setPostCount] = useState(10);
  const [selectedTag,setSelectedTag] = useState("");
  const [sortType,setSortType] = useState("popularity");

  const sortedDummy = [...dummy].sort((a, b) => {
    switch (sortType) {
      case "popularity": return;
      case "date" : return;
      case "score" : return (b.score - a.score); 
    }
  });

  // const options = [
  //   { value: 'popularity', label: '인기순' },
  //   { value: 'date', label: '날짜순' },
  //   { value: 'score', label: '평점순' }
  // ];

  return(<>
    <div className="search-container">
      <div className="search-main">
        <div className="search-form">
          <form>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="popularity">인기순</option>
              <option value="date">날짜순</option>
              <option value="score">평점순</option>
            </select>
            {/* <Select options={options} onChange={(e) => } /> */}
          </form>
        </div>
        {sortedDummy.slice(0, postCount).map((e,i) => (
          <SearchPost key={i} poster={e.poster} title={e.title} date={e.date} detail={e.detail} score={e.score} />
        ))}
        <div className="search-selection">
          <div className="search-selection-header">
            <div>할거면 장르로 구현해야 할듯?</div>
          </div>  
          <div className="search-selection-main">
            <ul className="">
              {["영화", "배우", "시리즈", "제작사"].map((tag) => (
                <li key={tag} 
                  className={`${(selectedTag===tag)?"search-selection-target":"search-selection-out"}`}
                  onClick={()=>{setSelectedTag(tag)}} >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="search-button">
        <button onClick={()=>setPostCount(prev => prev + 10)}>더보기</button>
        </div>
      </div>
    </div>
  </>)
}