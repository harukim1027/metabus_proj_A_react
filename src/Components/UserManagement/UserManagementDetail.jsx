import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    const userAssign = assignList?.filter(
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
    <div>
      <h2>UserManagementDetail</h2>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response?.status} ${deleteError.response?.statusText})`}

      {userData && (
        <>
          <div className="my-3">
            <span>유저아이디</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {userData.userID}
            </span>
          </div>

          <div className="my-3">
            <span>이름</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {userData.name}
            </span>
          </div>

          <div className="my-3">
            <span>닉네임</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {userData.nickname}
            </span>
          </div>

          <div className="my-3">
            <span>연락처</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {userData.phone_number}
            </span>
          </div>

          <div className="my-3">
            <span>이메일</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {userData.email}
            </span>
          </div>

          <div className="my-3">
            <span>거주지역</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {userData?.region === '서울' && '서울'}
              {userData?.region === '인천' && '인천'}
              {userData?.region === '대전' && '대전'}
              {userData?.region === '세종' && '세종'}
              {userData?.region === '대구' && '대구'}
              {userData?.region === '부산' && '부산'}
              {userData?.region === '광주' && '광주'}
              {userData?.region === '울산' && '울산'}
              {userData?.region === '제주' && '제주'}
              {userData?.region === '강원' && '강원'}
            </span>
          </div>

          <div>
            {assignArray?.map((assign) => {
              return (
                <>
                  <div>신청일</div>
                  <span className="border-2 border-sky-400 rounded p-1 ml-2">
                    {assign.user.created_at}
                  </span>
                  <div>신청번호</div>
                  <span className="border-2 border-sky-400 rounded p-1 ml-2">
                    {assign.assignment_no}
                  </span>
                  <div>신청동물</div>
                  <span className="border-2 border-sky-400 rounded p-1 ml-2">
                    {assign.animal.category.name}
                  </span>
                  <div>만남장소</div>
                  <span className="border-2 border-sky-400 rounded p-1 ml-2">
                    {assign.place_to_meet}
                  </span>
                  <div>만남날짜</div>
                  <span className="border-2 border-sky-400 rounded p-1 ml-2">
                    {assign.date_to_meet}
                  </span>
                  <div>신청상태</div>
                  <span className="border-2 border-sky-400 rounded p-1 ml-2">
                    {assign.status}
                  </span>
                </>
              );
            })}
          </div>
        </>
      )}

      <div className="my-5">
        <button onClick={handleDelete} className="hover:text-red-400">
          삭제
        </button>

        <Link to="/admin/usermanage/" className="hover:text-red-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default UserManagementDetail;
