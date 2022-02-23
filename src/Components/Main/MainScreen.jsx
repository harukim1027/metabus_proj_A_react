import { Link, NavLink } from 'react-router-dom';
import TopNav from './TopNavi';
import '../../App.css';
import ReviewList from 'Components/review/ReviewList';
import CrewList from './CrewList';
import './MainCrew.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MainScreen() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  // 스크롤 기능
  const [scrollY, setScrollY] = useState(0);
  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
  };

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });
  console.log('window Scroll From Top:', scrollY);

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

        <div className="flex justify-center mt-20">
          <div className="crew_header hover:scale-110 duration-500">
            <button onClick={() => navigate('/review/dog/')}>
              <img src="/dog5.png" alt="dog crew"></img>
            </button>
          </div>
          <div className="crew_header hover:scale-110 duration-500">
            <button onClick={() => navigate('/review/cat/')}>
              <img src="/cat4.png" alt="dog crew"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainScreen;
