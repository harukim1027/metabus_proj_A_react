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
      <div className="">
        <div>
          <TopNav />
        </div>

        <div className="xs:flex-none sm:flex sm:justify-center w-full mb-24">
          <button
            onClick={() => navigate('/review/dog/')}
            className="xs:flex xs:justify-center mt-10 mx-auto xs:w-4/5 sm:w-full scale-90 hover:scale-100 duration-500"
          >
            <img src="/dog5.png" className="w-5/6" alt="dog crew"></img>
          </button>

          <button
            onClick={() => navigate('/review/cat/')}
            className="xs:flex xs:justify-center mt-10 mx-auto xs:w-4/5 sm:w-full scale-90 hover:scale-100 duration-500"
          >
            <img src="/cat4.png" className="w-5/6" alt="dog crew"></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default MainScreen;
