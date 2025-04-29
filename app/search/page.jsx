"use client";

import { useEffect, useState } from "react";
import SearchPost from "../../components/SearchPost";
import img1 from "../../public/testimg/post.png";
import "./SearchPage.css"
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function searchPage(){

  const searchParams = useSearchParams();
  const [postCount,setPostCount] = useState(10);
  const [selectedTag,setSelectedTag] = useState("");
  const [sortType,setSortType] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState('');
  const [data,setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [uniqueGenres,setUniqueGenres] = useState([]);

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

  useEffect(() => {
    const genreSet = new Set();
  
    data.forEach(item => {
      item.genreDTOList.forEach(genre => {
        genreSet.add(genre.name);  
      });
    });
    const uniqueGenres = Array.from(genreSet);
    setUniqueGenres(uniqueGenres);
    console.log("장르정보",uniqueGenres);
    
  }, [data]);  // data가 변경될 때마다 실행

  useEffect(() => {
    const sortedArray = [...data]; // data 배열을 복사
    console.log(sortedArray);
    if (data.length > 0) { // data가 비어있지 않으면
      if (sortType === 'popularity') {
        sortedArray.sort((a, b) => b.responseMovieSearch.popularity - a.responseMovieSearch.popularity);
      } else if (sortType === 'date') {
        sortedArray.sort((a, b) => new Date(b.responseMovieSearch.release_date) - new Date(a.responseMovieSearch.release_date));
      } else if (sortType === 'score') {
        sortedArray.sort((a, b) => b.responseMovieSearch.vote_average - a.responseMovieSearch.vote_average);
      }
  
      setSortedData(sortedArray); // 정렬된 데이터를 sortedData로 설정
    }
  }, [sortType, data]);


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
        {sortedData.filter((e) => {if (selectedTag === "") 
          {return true;}return e.genreDTOList.some((genre) => genre.name === selectedTag);})
          .slice(0, postCount).map((e,i) => {
          const {responseMovieSearch} = e;
          const {movieId,poster_path, title, release_date, overview, vote_average } = responseMovieSearch;
          return(
          <Link key={i} href={`/detail?query=${movieId}`}>
            <SearchPost poster={poster_path} title={title} date={release_date} detail={overview} score={(vote_average * 10)} />
          </Link>
        )})}
        <div className="search-selection">
          <div className="search-selection-header">
            <div>장르 선택</div>
          </div>  
          <div className="search-selection-main">
            <ul className="">
              <li
                className={`${(selectedTag==="")?"search-selection-target":""}`}
                onClick={()=>{setSelectedTag("");setPostCount(10)}}>전체</li>
              {uniqueGenres.length === 0 ? (
                <li>정보 없음</li>
                ) : (
                uniqueGenres.map((tag) => (
                  <li
                    key={tag}
                    className={`${selectedTag === tag ? "search-selection-target" : ""}`}
                    onClick={() => {
                      if(tag === "") return setSelectedTag("");
                      setSelectedTag(tag);
                      setPostCount(10);
                      console.log(postCount)}}>
                    {tag}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="search-button">
        {(((sortedData.filter((e) => {if (selectedTag === "") 
          {return true;}return e.genreDTOList.some((genre) => genre.name === selectedTag);}).length + 10) - postCount) <= 10)?"":(<button onClick={()=>setPostCount(prev => prev + 10)}>더보기</button>)}
        </div>
      </div>
    </div>
  </>)
}