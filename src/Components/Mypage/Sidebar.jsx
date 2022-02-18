import { useAuth } from 'contexts/AuthContext';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const { auth } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="h-screen md:left-0 bg-sky-100 duration-300">
          <div className="flex-col">
            <NavLink
              to="/mypage/userinfo/"
              className="mt-2 text-center w-full inline-block font-extrabold"
            >
              {auth.userID}
            </NavLink>
            <div className="flex flex-col">
              <hr className="my-4 min-w-full" />

              <ul>
                <li className="rounded-lg mb-4">
                  <li className="p-1 hover:bg-blue-300">
                    <NavLink
                      to="/mypage/userinfo/"
                      exact
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg"
                    >
                      내 회원정보
                    </NavLink>
                  </li>
                </li>
                <li className="rounded-lg mb-2">
                  <li className="p-1 hover:bg-blue-300">
                    <NavLink
                      to="/mypage/assigninfo/"
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg"
                    >
                      내 입양신청
                    </NavLink>
                  </li>
                </li>
                <li className="rounded-lg mb-2 ">
                  <li className="p-1 hover:bg-blue-300">
                    <NavLink
                      to="/mypage/myposts/"
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg"
                    >
                      내 입양후기
                    </NavLink>
                  </li>
                </li>
                <li className="rounded-lg mb-2 text-gray-700">
                  <li className="p-1 hover:bg-blue-300">
                    <NavLink
                      to="/mypage/myinquiry/"
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg"
                    >
                      내 문의사항
                    </NavLink>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
