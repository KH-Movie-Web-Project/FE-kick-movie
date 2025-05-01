import { useEffect, useState } from "react";

export default function Tutorial({ targetSelector, onClose}) {
    const [target, setTarget] = useState(null);
    useEffect(() => {
        const target = document.querySelector(targetSelector);
        if (target) {
          const rect = target.getBoundingClientRect();
          setTarget(rect);
        }
      }, [targetSelector]);
    
      const handleClose = () => {
        localStorage.setItem('tutorialShown', 'true');
        onClose();

};
if (!target) return null;

return (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      pointerEvents: 'auto',
    }}
  >
    {/* 투명한 하이라이트 박스 */}
    <div
      style={{
        position: 'absolute',
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        backgroundColor: 'transparent',
        border: '3px solid yellow',
        zIndex: 1001,
        pointerEvents: 'auto',
      }}
    ></div>

    {/* 안내 메시지 */}
    <div
      style={{
        position: 'absolute',
        top: target.bottom + 10,
        left: target.left,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '10px',
        zIndex: 1002,
      }}
    >
      <p>여기서 검색이 가능합니다!</p>
      <button onClick={handleClose}>다시 보지 않기</button>
    </div>
  </div>
);
}