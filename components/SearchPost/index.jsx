import "./SearchPost.css"

export default function SearchPost({poster,title,date,detail,score}){
  return(<>
    <div className="searchpost-container">
      <div className="searchpost-poster">
        <img src={poster}/>
      </div>
      <div className="searchpost-content">
        <div className="searchpost-title">
          {title}
        </div>
        <div className="searchpost-date">
          {date}
        </div>
        <div className="searchpost-detail">
          {detail}
        </div>
      </div>
      <div className="searchpost-score">
        <div>
          {score}
        </div>
      </div>
    </div>
  </>)
}