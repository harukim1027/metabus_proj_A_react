import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserManagementDetail({ usermanagementId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: usermanagement, loading, error }, refetch] = useApiAxios(
    `/accounts/api/users/${usermanagementId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const [{}, deleteUser] = useApiAxios(
    {
      url: `/accounts/api/users/${usermanagementId}/`,
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
        navigate('/usermanagement/');
      });
    }
  };

  return (
    <div>
      <h2>UserManagementDetail</h2>

      {usermanagement && (
        <>
          <p>유저아이디</p>
          <div className="p-1 bg-white border-2 border-gray-300">
            {usermanagement.userID}
          </div>
          <p>이름</p>
          <div className="p-1 bg-white border-2 border-gray-300">
            {usermanagement.name}
          </div>
          <p>닉네임</p>
          <div className="p-1 bg-white border-2 border-gray-300">
            {usermanagement.nickname}
          </div>
          <p>연락처</p>
          <div className="p-1 bg-white border-2 border-gray-300">
            {usermanagement.phone_number}
          </div>
          <p>이메일</p>
          <div className="p-1 bg-white border-2 border-gray-300">
            {usermanagement.email}
          </div>
          <p>거주지역</p>
          <div className="p-1 bg-white border-2 border-gray-300">
            {usermanagement.region === 1
              ? 'Seoul'
              : 2
              ? 'Busan'
              : 3
              ? 'Daegu'
              : 4
              ? 'Incheon'
              : 5
              ? 'Daejeon'
              : 6
              ? 'Sejong'
              : 7
              ? 'Gwangju'
              : 8
              ? 'Ulsan'
              : 9
              ? 'Jeju'
              : 'Gangwon'}
          </div>
        </>
      )}

      <div className="my-5">
        <button onClick={handleDelete} className="hover:text-red-400">
          삭제
        </button>
        <Link
          to={`/usermanagement/${usermanagementId}/edit/`}
          className="hover:text-red-400"
        >
          수정
        </Link>
        <Link to="/usermanagement/" className="hover:text-red-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default UserManagementDetail;
