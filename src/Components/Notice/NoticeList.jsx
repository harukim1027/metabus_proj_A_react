import { Link } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';

function NoticeList() {
  const [query, setQuery] = useState(null);
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
    </div>
  );
}

export default NoticeList;
