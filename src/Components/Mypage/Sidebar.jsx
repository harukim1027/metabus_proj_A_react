import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-sky-100">
      <ul className="flex flex-col items-center w-full">
        <li onClick={() => navigate(`/mypage/userinfo/`)}>내 회원정보</li>
        <li onClick={() => navigate(`/mypage/assigninfo/`)}>내 입양신청</li>
        <li onClick={() => navigate(`/mypage/myposts/`)}>내 입양후기</li>
        <li onClick={() => navigate(`/mypage/myinquiry/`)}>내 문의사항</li>
      </ul>
    </div>
  );
}

export default Sidebar;
