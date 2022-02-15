import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        navigate('/management/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [userId]);

  return (
    <div>
      <h2>UserManagementDetail</h2>

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
              {userData?.region === '1' && 'Seoul'}
              {userData?.region === '2' && 'Busan'}
              {userData?.region === '3' && 'Daegu'}
              {userData?.region === '4' && 'Incheon'}
              {userData?.region === '5' && 'Daejeon'}
              {userData?.region === '6' && 'Sejong'}
              {userData?.region === '7' && 'Gwangju'}
              {userData?.region === '8' && 'Ulsan'}
              {userData?.region === '9' && 'Jeju'}
              {userData?.region === '10' && 'Gangwon'}
            </span>
          </div>
        </>
      )}

      <div className="my-5">
        <button onClick={handleDelete} className="hover:text-red-400">
          삭제
        </button>
        {/* <Link to={`/management/${userId}/edit/`} className="hover:text-red-400">
          수정
        </Link> */}
        <Link to="/management/" className="hover:text-red-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default UserManagementDetail;
