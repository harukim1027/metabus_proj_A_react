import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UserManagementDetail({}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { managementId } = useParams();

  const [{ data: management, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${managementId}/`,
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
        url: `/accounts/api/users/${managementId}/`,
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
  }, []);

  return (
    <div>
      <h2>UserManagementDetail</h2>

      {management && (
        <>
          <div className="my-3">
            <span>유저아이디</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {management.userID}
            </span>
          </div>

          <div className="my-3">
            <span>이름</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {management.name}
            </span>
          </div>

          <div className="my-3">
            <span>닉네임</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {management.nickname}
            </span>
          </div>

          <div className="my-3">
            <span>연락처</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {management.phone_number}
            </span>
          </div>

          <div className="my-3">
            <span>이메일</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {management.email}
            </span>
          </div>

          <div className="my-3">
            <span>거주지역</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {management.region === 1 && 'Seoul'}
              {management.region === 2 && 'Busan'}
              {management.region === 3 && 'Daegu'}
              {management.region === 4 && 'Incheon'}
              {management.region === 5 && 'Daejeon'}
              {management.region === 6 && 'Sejong'}
              {management.region === 7 && 'Gwangju'}
              {management.region === 8 && 'Ulsan'}
              {management.region === 9 && 'Jeju'}
              {management.region === 10 && 'Gangwon'}
            </span>
          </div>
        </>
      )}

      <div className="my-5">
        <button onClick={handleDelete} className="hover:text-red-400">
          삭제
        </button>
        <Link
          to={`/management/${managementId}/edit/`}
          className="hover:text-red-400"
        >
          수정
        </Link>
        <Link to="/management/" className="hover:text-red-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default UserManagementDetail;
