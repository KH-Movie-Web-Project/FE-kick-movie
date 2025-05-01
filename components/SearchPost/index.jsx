import { useEffect, useState } from "react";
import "./SearchPost.css";
import Image from "next/image";
import default_post from "../../public/logo/default_post.svg";

export default function SearchPost({poster,title,date,detail,score}){
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
    if(score > 0){
      setColor("red");
      return;
    }
    setColor("gry");
  },[score])
  
  return(<>
    <div className="searchpost-container">
      <div className="searchpost-poster">
        <Image src={poster?`http://image.tmdb.org/t/p/w185${poster}`:default_post} alt="" width={300} height={450} />
      </div>
      <div className="searchpost-content">
        <div className="searchpost-title">
          {title}
        </div>
        <div className="searchpost-date">
          {date || "미정"}
        </div>
        <div className="searchpost-detail">
          {previewText}
        </div>
      </div>
      <div className={`searchpost-score-${color}`}>
        <div>
          {(score===0)?"예정":Math.floor(score)}
        </div>
      </div>
    </div>
  </>)
}