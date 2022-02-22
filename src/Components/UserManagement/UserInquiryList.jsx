import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function UserInquiryList() {
  const { auth } = useAuth();
  const { userId } = useParams();

  const [{ data: UserInquiryData, loading, error }, refetch] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/?query=${userId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h2>문의 글 현황 페이지</h2>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}

      <table className="border-2">
        <thead className="border-2">
          <tr>
            <th className="border-2">번호</th>
            <th className="border-2">제목</th>
            <th className="border-2">등록 일시</th>
          </tr>
        </thead>

        <tbody>
          {UserInquiryData?.map((inquiry) => (
            <tr>
              <td>{inquiry.inquiry_no}</td>

              <td>
                <Link to={`/inquiry/${inquiry.inquiry_no}/`}>
                  {inquiry.title}
                </Link>
              </td>

              <td>{inquiry.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserInquiryList;
