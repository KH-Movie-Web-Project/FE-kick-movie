"use client";
import './mainpage.css'
import ImageCircle from './imagecircle'
import Tutorial from './Tutorial'
import { useEffect, useState } from 'react'


export default function Page() {

  const [showTutorial, setShowTutorial] = useState(false);
  const [sortType, setSortType] = useState("최신순");

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  }

  useEffect(()=>{
    const shown = localStorage.getItem('tutorialShown');
    if(!shown){
      setShowTutorial(true);
    }
  }, []);
  

  return (<>
  {
    showTutorial && (
      <Tutorial targetSelector={".search_form"}
      onClose={() => setShowTutorial(false)}
      />
    )
  }
    <fieldset className='search'>
      <form action="">
        <div><h2 className='welcome'>환영합니다</h2></div>
        <div className='welcome2'>당신이 찾는 그 영화! Kick-Movie에서 만나보세요</div>
        <div className='search-wrapper'>
        <input className='search_form' type="text" placeholder='영화,배우 검색.....' />
        <button type="submit" className='search-button'>🔍</button>
        </div>
      </form>
    </fieldset>
    
      <div className='main-div'>
        <form action="" className='form'>
                  <div className='custom-flex'>
                  <div className='result'>정렬 기준: </div>
                  <select name="sort2" className="sort2" value={sortType} onChange={handleSortChange}>
                    <option value="인기순">인기순</option>
                    <option value="최신순">최신순</option>
                  </select>
                  </div>
                  <div className='binggle'>
                  <ImageCircle sortType={sortType} />
                  </div>
        </form>
      </div>


    <fieldset className="submit_benefit">
      <table>
        <tbody>
          <tr>
            <td className="blank">

            </td>
            <td >
              <h2 className="blank2">지금 바로 가입하시고 놀라운 혜택을 누려보세요!</h2>
              <p className="blank2">당신이 저희 사이트에 방문하신다면 올해 최고의 선택이라고 확신하는 날이 올거라고 믿어 의심치않습니다!</p>
              
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </>)
}