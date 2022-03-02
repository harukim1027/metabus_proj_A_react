import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import './userManage.css';

function UserManagementDetail({ userId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${userId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteUser] =
    useApiAxios(
      {
        url: `/accounts/api/users/${userId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteUser().then(() => {
        navigate('/admin/usermanage/');
      });
    }
  };

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
        <div className="userManage_header rounded-xl shadow-md px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote className="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span className="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span className="relative text-white">" 회원 정보 "</span>
            </span>
          </blockquote>

          {loading && <LoadingIndicator />}
          {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
          {error &&
            `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}

          <div className="my-5">
            {userData && (
              <>
                <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200 whitespace-nowrap bg-white">
                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      유저아이디
                    </th>
                    <td className="px-6">{userData?.userID}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      이름
                    </th>
                    <td className="px-6">{userData?.name}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      닉네임
                    </th>
                    <td className="px-6">{userData?.nickname}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      연락처
                    </th>
                    <td className="px-6">{userData?.phone_number}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      이메일
                    </th>
                    <td className="px-6">{userData?.email}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      거주지역
                    </th>
                    <td className="px-6">{userData?.region}</td>
                  </tr>
                </table>
              </>
            )}
          </div>

          <div className="my-5 text-right">
            <button
              onClick={handleDelete}
              className="ml-3 flex-shrink-0 bg-blue-900 hover:bg-blue-500 border-blue-900 hover:border-blue-500 text-sm border-4 text-white py-1 px-2 rounded"
            >
              삭제
            </button>

            <button
              onClick={() => {
                navigate('/admin/usermanage/');
              }}
              className="ml-3 flex-shrink-0 bg-blue-900 hover:bg-blue-500 border-blue-900 hover:border-blue-500 text-sm border-4 text-white py-1 px-2 rounded"
            >
              목록
            </button>

            {deleteError && `삭제 요청 중 에러가 발생했습니다.`}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManagementDetail;
