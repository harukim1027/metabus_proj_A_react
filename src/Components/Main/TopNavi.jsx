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
                <img
                  src="/loginicon4.png"
                  alt="button"
                  className="hover:scale-110 duration-200"
                ></img>
              </NavLink>
            </button>
            <button className="icon_size3">
              <NavLink to="/accounts/checksignup/">
                <img
                  src="/signupicon3.png"
                  alt="button"
                  className="hover:scale-110 duration-200"
                ></img>
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
                  <img
                    className="hover:scale-110 duration-200"
                    src="/manageicon1.png"
                    alt="manageiconbutton"
                  ></img>
                </NavLink>
              </button>
            ) : (
              <button className="icon_size4">
                <NavLink to="/mypage/userinfo/">
                  <img
                    className="mt-5 hover:scale-110 duration-200"
                    src="/mypageicon1.png"
                    alt="mypagebutton"
                  ></img>
                </NavLink>
              </button>
            )}

            <button className="icon_size4" onClick={handleLogout}>
              <img
                className="hover:scale-110 duration-200"
                src="/logouticon1.png"
                alt="button"
              ></img>
            </button>
          </div>
        )}
      </div>
      <div
        onClick={() => navigate('/')}
        className="w-full text-white  cursor-pointer mt-12"
      >
        <img src="/main09.png" alt="Street Animal Adopter"></img>
      </div>
      <div className="py-4 bg-white grid grid-cols-3 text-center text-3xl font-bold">
        <MyLink to="/notice/">
          <div className="hover:text-white hover:bg-green-400 ">공지사항</div>
        </MyLink>

        {auth.is_staff ? (
          <MyLink to="/inquiry/">
            <div className="hover:text-white hover:bg-green-400 ">
              1:1 문의 현황
            </div>
          </MyLink>
        ) : (
          <MyLink
            to={auth.isLoggedIn ? '/assignment/check/' : '/accounts/login/'}
          >
            <div className="hover:text-white hover:bg-blue-400 ">
              크루원 신청
            </div>
          </MyLink>
        )}
        <MyLink to="/review/">
          <div className="hover:text-white hover:bg-purple-400 ">커뮤니티</div>
        </MyLink>
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return <NavLink to={to}>{children}</NavLink>;
}

export default TopNav;
