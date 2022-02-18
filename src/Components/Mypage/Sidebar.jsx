import React from 'react';
import { NavLink } from 'react-router-dom';
// import style from './style.jsx';

function Sidebar() {
  const menus = [
    { name: '내 정보', path: '/mypage/userinfo/' },
    { name: '입양 신청 현황', path: '/mypage/assigninfo/' },
    { name: '내가 쓴 글', path: '/mypage/myposts/' },
    { name: '1:1 문의 글', path: '/mypage/myinquiry/' },
  ];
  return (
    <>
      <div class="flex left relative">
        <div className="inline-block absolute top-20 left-10">
          <ul className="text-black">
            {menus.map((a) => (
              <li className="block cursor-pointer p-2 hover:bg-blue-300 hover:text-pink-700">
                <i className="w-8 fas fa-search p-2 bg-orange-300 rounded-full mx-2">
                  <NavLink to={a.path}>{a.name}</NavLink>
                </i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
