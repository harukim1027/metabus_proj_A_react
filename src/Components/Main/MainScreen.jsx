import { Link, NavLink } from 'react-router-dom';
import TopNav from './TopNavi';
import '../../App.css';
import ReviewList from 'Components/review/ReviewList';
import CrewList from './CrewList';
import './MainCrew.css';

function MainScreen() {
  return (
    <>
      <div className="header">
        <div>
          <TopNav />
        </div>
        <div>
          <div className="flex justify-center mt-10">
            <div className="crew_header hover:scale-110 duration-500">
              <button>
                <img src="/dog5.png" alt="dog crew"></img>
              </button>
            </div>
            <div className="crew_header hover:scale-110 duration-500">
              <button>
                <img src="/cat4.png" alt="dog crew"></img>
              </button>
            </div>
          </div>
        </div>
        <p class="mt-3 text-center text-gray-500 text-xs">
          &copy;2022 METABUS Corp. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default MainScreen;
