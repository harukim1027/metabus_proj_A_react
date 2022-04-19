import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import Sidebar from 'Components/Mypage/Sidebar';
import LoadingIndicator from 'LoadingIndicator';

function Myinfo() {
  const { auth } = useAuth();
  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.userID}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [userData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [userData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 mypage_header rounded-xl shadow-md overflow-hidden sm:px-20 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="xs:mt-2 md:mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span class="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                " 내 회원정보 "
              </span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 정보가 없습니다.
            </div>
          )}

          <div className="mb-5 overflow-hidden">
            <table className="mb-5 mt-3 border text-center min-w-full divide-y divide-gray-200">
              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <td>{userData?.name}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                  아이디
                </th>
                <td>{userData?.userID}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider">
                  닉네임
                </th>
                <td>{userData?.nickname}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <td>{userData?.email}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <td>{userData?.phone_number}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">
                  거주지
                </th>
                <td>{userData?.region}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">
                  비밀번호 퀴즈
                </th>
                <td>{userData?.password_quiz}</td>
              </tr>

              <tr>
                <th className="xl:text-xl lg:text-xl md:text-m sm:text-m xs:text-sm border border-slate-200 bg-gray-50 px-4 py-3 text-center font-bold text-gray-500 uppercase tracking-wider">
                  퀴즈 정답
                </th>
                <td>{userData?.password_quiz_answer}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myinfo;
