import { Link, NavLink } from 'react-router-dom';
import TopNav from './TopNavi';
import '../../App.css';
import ReviewList from 'Components/review/ReviewList';
import CrewList from './CrewList';
import './MainCrew.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MainScreen() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

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

        <p className="mt-3 text-center text-gray-500 text-xs">
          &copy;2022 METABUS Corp. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default MainScreen;
