import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import '../../App.css';
import './TopNavi.css';

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
          <div>
            <button className="icon_size3">
              <NavLink to="/accounts/login/">
                <img src="/loginicon4.png" alt="button"></img>
              </NavLink>
            </button>
            <button className="icon_size3">
              <NavLink to="/accounts/checksignup/">
                <img src="/signupicon3.png" alt="button"></img>
              </NavLink>
            </button>
          </div>
        )}
      </div>
      <div className="flex text-xl place-content-between">
        <div></div>
        {auth.isLoggedIn && (
          <div className="flex">
            {auth.is_staff ? (
              <button className="icon_size4">
                <NavLink to="/admin/main/">
                  <img src="/manageicon1.png" alt="manageiconbutton"></img>
                </NavLink>
              </button>
            ) : (
              <button className="icon_size4">
                <NavLink to="/mypage/userinfo/">
                  <img
                    className="mt-6"
                    src="/mypageicon1.png"
                    alt="mypagebutton"
                  ></img>
                </NavLink>
              </button>
            )}

            <button className="icon_size4" onClick={handleLogout}>
              <img src="/logouticon1.png" alt="button"></img>
            </button>
          </div>
        )}
      </div>
      <div
        onClick={() => navigate('/')}
        className="w-full text-white  cursor-pointer"
      >
        <img src="/main09.png" alt="Street Animal Adopter"></img>
      </div>
      <div className="grid grid-cols-3 text-center text-xl font-semibold">
        <MyLink to="/notice/">공지사항</MyLink>
        {auth.is_staff ? (
          <MyLink to="/inquiry/">1:1 문의 현황</MyLink>
        ) : (
          <MyLink to="/assignment/check/">크루원 신청</MyLink>
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
