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

  return (
    <div>
      {noticeList && (
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
        <button onClick={() => navigate('/notice/new/')}>공지 작성</button>
      )}
    </div>
  );
}

export default NoticeList;
