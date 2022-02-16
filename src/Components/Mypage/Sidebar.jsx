import React from 'react';
import { NavLink } from 'react-router-dom';
// import style from './';
import SidebarItem from './SidebarItem';

function Sidebar() {
  const menus = [
    { name: '내 정보', path: '/mypage/userinfo/' },
    { name: '입양 신청 현황', path: '/mypage/assigninfo/' },
    { name: '내가 쓴 글', path: '/mypage/myposts/' },
    { name: '1:1 문의 글', path: '/mypage/myinquiry/' },
  ];

  return (
    <div className="w-full h-screen bg-blue-200">
      <div className="w-64 sm:w-1/2 md:w-64 h-full bg-white-300 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl border border-gray-900">
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{ color: 'gray', textDecoration: 'none' }}
              to={menu.path}
              key={index}
              activeStyle={{ color: 'black' }}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
