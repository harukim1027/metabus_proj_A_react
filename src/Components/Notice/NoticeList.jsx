import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';

function NoticeList() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: noticeList, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/${query ? '?query=' + query : ''}`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <>
      <input
        type="text"
        name="query"
        onChange={getQuery}
        onKeyPress={handleKeyPress}
        className="p-2 border-2 border-purple-400 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        placeholder="제목을 검색하세요."
      />
      <button onClick={() => refetch()}>검색</button>
      <div>
        {noticeList && (
          // 테이블로 표현한 방식 (assignment와 다르게 해볼 예정)
          <table>
            <tbody>
              {noticeList.map((notice) => (
                <tr>
                  <td>{notice.notice_no}</td>
                  <td>
                    <Link to={`/notice/${notice.notice_no}/`}>
                      {notice.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {auth.is_staff && (
          <button onClick={() => navigate('/admin/notice/new/')}>
            공지 작성
          </button>
        )}
      </div>
    </>
  );
}

export default NoticeList;
