import SearchPost from "../../components/SearchPost";
import img1 from "../../public/icons/java_yellow.jpeg";
import "./SearchPage.css"

const dummy = [
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
  },
  {
    poster:img1,
    title:"영화 제목",
    date:"2025 03 04",
    detail:"영화 내용",
    score:"91",
  }

]

export default function searchPage(){
  return(<>
    <div className="search-container">
      <div className="search-header">
        <form action="">
          <select>
            <option value="popularity">인기순</option>
            <option value="date">날짜순</option>
            <option value="score">평점순</option>
          </select>
        </form>
      </div>
      <div className="search-main">
        {dummy.map((e,i) => (
          <SearchPost key={i} poster={e.poster} title={e.title} date={e.date} detail={e.detail} score={e.score} />
        ))}
        <div className="search-selection">
          
        </div>
      </div>
      <div className="search-footer">
          1 2 3 4
      </div>
    </div>
  </>)
}