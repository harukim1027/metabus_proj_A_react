import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import '../../App.css';

function TopNav() {
  const navigate = useNavigate();

  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="header">
      <div className="flex text-xl place-content-between">
        <div></div>
        {!auth.isLoggedIn && (
          <div className="flex">
            <NavLink
              to="/accounts/login/"
              className="border-2 bg-red-300  py-2 rounded w-20 text-center"
            >
              로그인
            </NavLink>
            <NavLink
              to="/accounts/checksignup/"
              className="border-2 bg-blue-300 py-2 rounded w-20 text-center"
            >
              회원가입
            </NavLink>
          </div>
        )}
      </div>
      <div className="flex text-xl place-content-between">
        <div></div>
        {auth.isLoggedIn && (
          <div className="flex">
            {auth.is_staff ? (
              <NavLink
                to="/admin/main/"
                className="border-2 border-blue-300 py-1 rounded w-20 text-center"
              >
                사이트 관리
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/inquiry/"
                  className="border-2 border-blue-300 py-1 rounded w-20 text-center"
                >
                  1:1 문의
                </NavLink>
                <NavLink
                  to="/accounts/profile/"
                  className="border-2 border-blue-300 py-1 rounded w-20 text-center"
                >
                  마이 페이지
                </NavLink>
              </>
            )}

            <button
              onClick={handleLogout}
              className="border-2 border-blue-300 py-1 rounded w-20 text-center"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
      <div
        onClick={() => navigate('/')}
        className="w-full text-white  cursor-pointer"
      >
        <img src="/main08.png" alt="Street Animal Adopter"></img>
      </div>
      <div className="grid grid-cols-3 text-center text-xl font-semibold">
        <MyLink to="/notice/">공지사항</MyLink>
        {auth.is_staff ? (
          <MyLink to="/admin/main/inquiry/">1:1 문의 현황</MyLink>
        ) : (
          <MyLink to="/adoptassignment/check/">크루원 신청</MyLink>
        )}
        <MyLink to="/review/">커뮤니티</MyLink>
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink to={to} className={BaseClassName}>
      {children}
    </NavLink>
  );
}
const BaseClassName = 'border-2 border-blue-300 py-2';

export default TopNav;
