import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function TopNav() {
  const navigate = useNavigate();

  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex">
        {!auth.isLoggedIn && (
          <>
            <MyLink to="/accounts/login/">로그인</MyLink>
            <MyLink to="/accounts/signup/">회원가입</MyLink>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <MyLink to="/accounts/profile/">프로필</MyLink>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
      <div
        onClick={() => navigate('/')}
        className="w-full text-center text-2xl font-extrabold text-white py-20 bg-sky-200 cursor-pointer"
      >
        <h1>Street Animal Adopter</h1>
      </div>
      <div className="grid grid-cols-3 text-center">
        <MyLink to="/notice/">공지사항</MyLink>
        <MyLink to="/adoptassignment/">크루원 신청</MyLink>
        <MyLink to="/community/">커뮤니티</MyLink>
      </div>
    </>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink to={to} className={BaseClassName}>
      {children}
    </NavLink>
  );
}
const BaseClassName = 'border-2 border-gray-300 py-2';

export default TopNav;
