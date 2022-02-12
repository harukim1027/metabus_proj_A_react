import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';

function UserManagementIndex() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();

  const [{ data: usermanagementIndex, loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/users/',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('ENTER');
      const value = e.target.value;
      setQuery(value);
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
      />

      {usermanagementIndex && (
        <div>
          {usermanagementIndex.map((usermanagement) => (
            <div>
              <Link to={`/usermanagement/${usermanagement.userID}/`}>
                {usermanagement.userID}
              </Link>

              <Link to={`/usermanagement/${usermanagement.userID}/`}>
                {usermanagement.name}
              </Link>

              <Link to={`/usermanagement/${usermanagement.userID}/`}>
                {usermanagement.nickname}
              </Link>
              <span>{usermanagement.phone_number}</span>
              <span>{usermanagement.email}</span>
              <span>
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
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserManagementIndex;
