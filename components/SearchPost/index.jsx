import { useEffect, useState } from "react";
import "./SearchPost.css"
import Image from "next/image";

export default function SearchPost({poster,title,date,detail,score}){
  const posterImage = `http://image.tmdb.org/t/p/w185${poster}`
  const previewText = (detail.length > 150)?detail.slice(0, 150) + "...":detail;
  const [color,setColor] = useState("green");
  
  useEffect(()=>{
    if(score > 75){
    setColor("green");
    return;
    } 
    if(score > 50){
    setColor("yellow");
    return;
    }
    setColor("red");
  },[score])
  
  return(<>
    <div className="searchpost-container">
      <div className="searchpost-poster">
        <Image src={posterImage} alt="" width={300} height={450} />
      </div>
      <div className="searchpost-content">
        <div className="searchpost-title">
          {title}
        </div>
        <div className="searchpost-date">
          {date}
        </div>
        <div className="searchpost-detail">
          {previewText}
        </div>
      </div>
      <div className={`searchpost-score-${color}`}>
        <div>
          {score}
        </div>
      </div>
    </div>
  </>)
}