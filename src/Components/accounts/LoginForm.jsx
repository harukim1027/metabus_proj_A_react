import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
// import DebugStates from 'DebugStates';
import Button from 'Button';
import '../../App.css';
import { useEffect, useState } from 'react';
import LoadingIndicator from 'LoadingIndicator';

const INITIAL_FIELD_VALUES = { userID: '', password: '' };

function LoginForm() {
  const navigate = useNavigate();

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, []);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //-------------

  // post요청은 하단에 에러메시지가 위치.
  const { login } = useAuth();
  const [{ loading, error, errorMessages }, requestToken] = useApiAxios(
    {
      url: `/accounts/api/token/`,
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const {
        access,
        refresh,
        userID,
        nickname,
        name,
        phone_number,
        email,
        region,
        password_quiz,
        password_quiz_answer,
        is_staff,
      } = response.data;
      // TODO: access/refresh token을 브라우저 어딘가에 저장해야 합니다.
      // 저장해서 페이지 새로고침이 발생하더라도 그 token이 유실되지 않아야 합니다.
      login({
        access,
        refresh,
        userID,
        nickname,
        name,
        phone_number,
        email,
        region,
        password_quiz,
        password_quiz_answer,
        is_staff,
      });

      // console.log('access :', access);
      // console.log('refresh :', refresh);
      // console.log('userID :', userID);
      // console.log('nickname :', nickname);
      // console.log('name :', name);
      // console.log('phone_number :', phone_number);
      // console.log('email :', email);
      // console.log('region :', region);
      // console.log('password_quiz :', password_quiz);
      // console.log('password_quiz_answer :', password_quiz_answer);
      // console.log('is_staff :', is_staff);

      // 인증 후, 이동할 주소를 지정합니다.
      navigate('/');
    });
  };

  return (
    <div className="header mx-5" id="topLoc">
      <h2 className="text-center  xs:text-3xl md:text-4xl py-5 pb-5 font-bold mt-5 mb-3">
        🐹 로그인
      </h2>

      <div className="flex justify-center">
        <div className="max-w-m">
          <form
            className="bg-white shadow-md rounded-xl px-20 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mt-10 mb-4">
              <label className=" block text-gray-700 text-2xl font-bold mb-2">
                ID
              </label>

              <input
                type="text"
                name="userID"
                value={fieldValues.userID}
                onChange={handleFieldChange}
                placeholder="userID"
                className="text-m shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={fieldValues.password}
                onChange={handleFieldChange}
                placeholder="***********"
                className="text-m shadow appearance-none border border-red-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="text-center  mb-5">
              {/* 버튼 */}
              <button className="shadow-lg xs:text-2xl md:text-3xl bg-blue-900 hover:bg-blue-700 rounded-xl text-white font-bold py-1 ">
                &nbsp;&nbsp;Log In&nbsp;&nbsp;
              </button>
              {/* 저장 에러  */}
              <div className="text-sm">
                {loading && <LoadingIndicator>로그인 중 ...</LoadingIndicator>}
                {error?.response?.status === 401 && (
                  <div className="text-red-400">로그인에 실패했습니다!</div>
                )}
                {error && (
                  <>
                    <p className="text-red-400">
                      아이디, 비밀번호를 다시 확인해주세요.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="text-center mb-5 border:bg-pink-200">
              {/* 아이디 찾기 링크 이동 */}
              <a
                href="/accounts/findid/"
                className="text-gray-500 mr-5 xs:text-xxs md:text-base hover:bg-blue-200 hover:text-white font-semibold"
              >
                &nbsp;아이디 찾기&nbsp;
              </a>
              {/* 비밀번호 찾기 링크 이동 */}
              <a
                href="/accounts/changepassword/"
                className="text-gray-500 xs:text-xxs md:text-base hover:bg-blue-200 hover:text-white font-semibold"
              >
                &nbsp;비밀번호 찾기&nbsp;
              </a>
            </div>

            <hr />
            {/* 회원가입 링크 이동 */}
            <p className="bg-yellow-100 xs:text-xxs xs:text-xxs md:text-base text-center mt-5  mb-2 text-red-300 font-semibold">
              아직 회원이 아니신가요?
            </p>
            <div className="text-right border:bg-pink-200">
              <a
                href="/accounts/checksignup/"
                className="text-right xs:text-base md:text-xl hover:bg-pink-200 hover:text-white font-semibold"
              >
                회원가입 하러 가기 ❕
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* <DebugStates auth={auth} fieldValues={fieldValues} /> */}
    </div>
  );
}

export default LoginForm;
