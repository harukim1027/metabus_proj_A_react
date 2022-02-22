import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';

function UserManagementIndex() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();

  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${query ? '?query=' + query : ''}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h2>UserManagementIndex</h2>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}

      <input
        type="text"
        placeholder="아이디,이름,닉네임으로 검색"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="mt-3 ml-3 border-2 border-gray-300"
      />
      <button
        type="submit"
        onClick={() => refetch()}
        className="font-bold py-2 px-4 rounded cursor-pointer ml-1 bg-blue-500 hover:bg-blue-300 text-white"
      >
        검색
      </button>

      <table className="border-2">
        <thead className="border-2">
          <tr>
            <th className="border-2">유저아이디</th>
            <th className="border-2">이름</th>
            <th className="border-2">닉네임</th>
            <th className="border-2">연락처</th>
            <th className="border-2">이메일</th>
            <th className="border-2">거주지역</th>
          </tr>
        </thead>

        <tbody>
          {userData &&
            userData.map((user) => (
              <tr>
                <td>
                  <Link to={`/admin/usermanage/${user.userID}/`}>
                    {user.userID}
                  </Link>
                </td>

                <td>
                  <Link to={`/admin/usermanage/${user.userID}/`}>
                    {user.name}
                  </Link>
                </td>

                <td>
                  <Link to={`/admin/usermanage/${user.userID}/`}>
                    {user.nickname}
                  </Link>
                </td>

                <td>{user.phone_number}</td>

                <td>{user.email}</td>

                <td>
                  {user?.region === '서울' && '서울'}
                  {user?.region === '인천' && '인천'}
                  {user?.region === '대전' && '대전'}
                  {user?.region === '세종' && '세종'}
                  {user?.region === '대구' && '대구'}
                  {user?.region === '부산' && '부산'}
                  {user?.region === '광주' && '광주'}
                  {user?.region === '울산' && '울산'}
                  {user?.region === '제주' && '제주'}
                  {user?.region === '강원' && '강원'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementIndex;
