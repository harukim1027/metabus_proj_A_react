import TopNav from './TopNavi';
import '../../App.css';
import './MainCrew.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MainScreen() {
  const navigate = useNavigate();

  // 스크롤 기능

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, []);

  //-------------

  return (
    <>
      <div className="header">
        <div>
          <TopNav />
        </div>

        <div className="xs:flex-none sm:flex sm:justify-center w-full">
          <div className="xs:flex xs:justify-center">
            <div className="crew_header hover:scale-110 duration-500 ">
              <button onClick={() => navigate('/review/dog/')}>
                <img className="xs:w-full" src="/dog5.png" alt="dog crew"></img>
              </button>
            </div>
          </div>
          <div className="xs:flex xs:justify-center">
            <div className="crew_header hover:scale-110 duration-500 xs:flex xs:justify-center">
              <button onClick={() => navigate('/review/cat/')}>
                <img src="/cat4.png" className="xs:w-full" alt="dog crew"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainScreen;
