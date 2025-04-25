
'use client'; 
import { useRouter } from 'next/navigation';
import "./SearchHeader.css";
import logo from "../../public/logo/logo.svg";
import Image from 'next/image';

export default function SearchHeader(){
  const router = useRouter();
  return(<>
    <div className="search-header-container">
      <div className="search-header-logo">
        <Image src={logo} alt="로고" />
      </div>
      <div className="search-header-bar">
        <input type="text" 
        // onClick={()=>{router.push('/search')}}
          placeholder='검색하고 싶은 내용을 입력해주세요'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            const data = e.target.value;
            console.log("작동완료",data);
            router.push(`/search?query=${data}`)}
          }}
          />
      </div>
    </div>
  </>)
}