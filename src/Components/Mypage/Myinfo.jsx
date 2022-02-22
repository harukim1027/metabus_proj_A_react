import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import Sidebar from 'Components/Mypage/Sidebar';

function Myinfo() {
  const { auth } = useAuth();
  const [{ data: userData }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.userID}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="header">
        <div className="justify-center mx-20">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="mypage_header rounded-xl shadow-md">
              <blockquote class="mt-5 text-4xl mb-3 font-semibold italic text-center text-slate-900">
                <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                  <span class="relative text-white">" 내 회원정보 "</span>
                </span>
              </blockquote>

              <div className="mb-5 overflow-hidden border-b border-gray-200">
                <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        이름
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        아이디
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        닉네임
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        이메일
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        연락처
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        거주지
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        비밀번호 퀴즈
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        비밀번호 퀴즈 정답
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="col">{userData?.name}</td>
                      <td scope="col">{userData?.userID}</td>
                      <td scope="col">{userData?.nickname}</td>
                      <td scope="col">{userData?.email}</td>
                      <td scope="col">{userData?.phone_number}</td>
                      <td scope="col">{userData?.region}</td>
                      <td scope="col">{userData?.password_quiz}</td>
                      <td scope="col">{userData?.password_quiz_answer}</td>
                    </tr>
                  </tbody>
                  {/* <h2>이름 : {userData?.name}</h2>
                  <h2>아이디 : {userData?.userID}</h2>
                  <h2>닉네임 : {userData?.nickname}</h2>
                  <h2>이메일 : {userData?.email}</h2>
                  <h2>연락처 : {userData?.phone_number}</h2>
                  <h2>거주지 : {userData?.region}</h2>
                  <h2>비밀번호 퀴즈 : {userData?.password_quiz}</h2>
                  <h2>비밀번호 퀴즈 정답 : {userData?.password_quiz_answer}</h2> */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myinfo;
