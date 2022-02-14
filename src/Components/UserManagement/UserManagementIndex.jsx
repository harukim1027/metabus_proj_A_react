import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';

function UserManagementIndex() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();

  const [{ data: managementIndex, loading, error }, refetch] = useApiAxios(
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

      <input
        type="text"
        placeholder="검색어를 입력해주세요."
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

      {managementIndex && (
        <div className="mt-5 ml-10">
          {managementIndex.map((management) => (
            <div>
              <span className="p-1 ml-2">
                <Link to={`/management/${management.userID}/`}>
                  {management.userID}
                </Link>
              </span>

              <span className="p-1 ml-2">
                <Link to={`/management/${management.userID}/`}>
                  {management.name}
                </Link>
              </span>

              <span className="p-1 ml-2">
                <Link to={`/management/${management.userID}/`}>
                  {management.nickname}
                </Link>
              </span>

              <span className="p-1 ml-2">{management.phone_number}</span>
              <span className="p-1 ml-2">{management.email}</span>
              <span className="p-1 ml-2">
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
          ))}
        </div>
      )}
    </div>
  );
}

export default UserManagementIndex;
