import React, { useEffect, useState } from 'react';
import '../../App.css';
import './Introduce.css';

// 소개 페이지 - 사진만 출력
function IntroduceMain() {
  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, []);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //-------------

  return (
    <>
      <div className="header flex justify-center" id="topLoc">
        <div className="flex flex-wrap justify-center overflow-hidden md:px-10 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="introduce_header shadow-md flex flex-wrap justify-center w-full">
            <div className="mt-10 assign_explanation flex flex-wrap justify-center">
              <img
                src="/introduce.png"
                alt="introduce"
                className="xs:w-full sm:w-full lg:w-3/4  xl:w-full"
              />
            </div>
            <hr className="pb-4" />
            <br />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="mb-5  hover:animate-bounce rounded-lg text-5xl"
          onClick={() => goTop()}
        >
          🔝
        </button>
      </div>
    </>
  );
}
export default IntroduceMain;
