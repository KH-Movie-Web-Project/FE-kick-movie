"use client";

import { useEffect, useState } from "react";
import SearchPost from "../../components/SearchPost";
import img1 from "../../public/testimg/post.png";
import "./SearchPage.css"
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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

  const searchParams = useSearchParams();
  const [postCount,setPostCount] = useState(10);
  const [selectedTag,setSelectedTag] = useState("전체");
  const [sortType,setSortType] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState('');
  const [data,setData] = useState([]);

  // const sortedData = [...data].sort((a, b) => {
  //   switch (sortType) {
  //     case "popularity": return;
  //     case "date" : return;
  //     case "score" : return (b.score - a.score); 
  //   }
  // });

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // 2. searchQuery가 바뀌면 fetchSearch 실행
  useEffect(() => {
    if (!searchQuery) return;

    console.log("여기까진 옴",searchQuery);
    async function fetchSearch() {
      try {
        const res = await fetch(`http://localhost:8080/open-api/search?query=${searchQuery}`);
        const json = await res.json();
        console.log(json);
        setData(json);
        
      } catch (err) {
        console.error("패치 오류:", err);
      }
    }
    console.log(data.overview);
    fetchSearch();
  }, [searchQuery]);

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
          </form>
        </div>
        {data.slice(0, postCount).map((e,i) => {
          const {responseMovieSearch} = e;
          const {backdrop_path, title, release_date, overview, vote_average } = responseMovieSearch;
          return(
          <Link key={i} href="/detail">
            <SearchPost poster={backdrop_path} title={title} date={release_date} detail={overview} score={(vote_average * 10)} />
          </Link>
        )})}
        <div className="search-selection">
          <div className="search-selection-header">
            <div>장르 선택</div>
          </div>  
          <div className="search-selection-main">
            <ul className="">
              <li
                className={`${(selectedTag==="전체")?"search-selection-target":""}`}
                onClick={()=>{setSelectedTag("전체")}}>전체</li>
              {["공포", "로맨스", "액션", "코미디"].map((tag) => (
                <li key={tag} 
                  className={`${(selectedTag===tag)?"search-selection-target":""}`}
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