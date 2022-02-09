import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';

function NoticeList() {
  const [query, setQuery] = useState(null);
  const [{ data: notices, loading, error }, refetch] = useApiAxios(
    `/maple/api/character/${query ? '?query=' + query : ''}`,
    { manual: true },
  );
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {notices && (
        <table>
          <tr>
            <td>{notices.notice_no}</td>
          </tr>
        </table>
      )}
    </div>
  );
}

export default NoticeList;
