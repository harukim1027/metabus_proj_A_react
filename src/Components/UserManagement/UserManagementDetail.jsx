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

  const [assignArray, setAssignArray] = useState([]);

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

  const [{ data: assignList }, refetch1] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    const userAssign = assignList?.results.filter(
      (assignment) => assignment.user.userID === userData.userID,
    );
    setAssignArray(userAssign);
  }, [assignList, userData]);

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
    refetch1();
  }, []);

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="userManage_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote className="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span className="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span className="relative text-white">" 회원 정보 "</span>
            </span>
          </blockquote>

          {loading && <LoadingIndicator />}
          {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
          {error &&
            `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}

          <div className="my-5 overflow-hidden">
            {userData && (
              <>
                <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      유저아이디
                    </th>
                    <td>{userData.userID}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      이름
                    </th>
                    <td>{userData.name}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      닉네임
                    </th>
                    <td>{userData.nickname}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      연락처
                    </th>
                    <td>{userData.phone_number}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      이메일
                    </th>
                    <td>{userData.email}</td>
                  </tr>

                  <tr>
                    <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                      거주지역
                    </th>
                    <td>{userData?.region}</td>
                  </tr>
                </table>

                {assignArray?.map((assign) => {
                  return (
                    <>
                      <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            신청일
                          </th>
                          <td>{assign.created_at}</td>
                        </tr>

                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            신청번호
                          </th>
                          <td>{assign.assignment_no}</td>
                        </tr>

                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            신청동물
                          </th>
                          <td>{assign.animal.category.name}</td>
                        </tr>

                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            동물 등록번호
                          </th>
                          <td>{assign.animal.animal_reg_num}</td>
                        </tr>

                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            만남장소
                          </th>
                          <td>{assign.place_to_meet}</td>
                        </tr>

                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            만남날짜
                          </th>
                          <td>{assign.date_to_meet}</td>
                        </tr>

                        <tr>
                          <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                            신청상태
                          </th>
                          <td>{assign.status}</td>
                        </tr>
                      </table>
                    </>
                  );
                })}
              </>
            )}
          </div>

          <div className="my-5 text-right">
            <button
              onClick={handleDelete}
              className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              삭제
            </button>

            <button
              onClick={() => {
                navigate('/admin/usermanage/');
              }}
              className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
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
