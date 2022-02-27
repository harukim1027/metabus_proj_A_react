import { useAuth } from 'contexts/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './sidebar.css';

const Sidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(200);
  const side = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log(isOpen);

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(200);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(200);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  return (
    <div
      ref={side}
      className="sidebar absolute"
      style={{
        width: '200px',
        height: '330px',
        transform: `translatex(${-xPosition}px)`,
      }}
    >
      <button onClick={() => toggleMenu()} className="button">
        {isOpen ? (
          <>
            <img
              src="/sidecloseicon3.png"
              alt="button"
              className=" duration-200 "
            ></img>
          </>
        ) : (
          <>
            <img
              src="/sidemenuicon3.png"
              alt="button"
              className="duration-200"
            ></img>
          </>
        )}
      </button>
      <div className="mb-5">
        <h2 className="bg-gray-100  mb-5 text-2xl text-center">
          {auth.userID} <hr />
        </h2>

        <ul>
          <li className="mx-5 mb-3 ">
            <div
              onClick={() => navigate(`/mypage/userinfo/`)}
              className="cursor-pointer"
            >
              <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-s font-bold hover:bg-blue-800">
                내 정보
              </span>
            </div>
          </li>
          <hr />
          <li className="mx-5 mb-3 mt-3">
            <div
              onClick={() => navigate(`/mypage/assigninfo/`)}
              className="cursor-pointer
              hover:bg-blue-400
              
              "
            >
              <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-s font-bold">
                내 입양신청
              </span>
            </div>
          </li>
          <hr />
          <li className="mx-5 mb-3 mt-3">
            <div
              onClick={() => navigate(`/mypage/myposts/`)}
              className="cursor-pointer"
            >
              <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-s font-bold hover:bg-purple-300">
                내 작성글
              </span>
            </div>
          </li>
          <hr />

          <li className="mx-5 mb-5 mt-3">
            <div
              onClick={() => navigate(`/mypage/myinquiry/`)}
              className="cursor-pointer"
            >
              <span className="text-black hover:text-white xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-s font-bold hover:bg-yellow-300">
                내 문의사항
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
