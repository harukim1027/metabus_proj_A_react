import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function UserReviewList() {
  const { auth } = useAuth();
  const { userId } = useParams();

  const [{ data: UserReviewData, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/?query=${userId}`,
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
      <h2>입양 후기글 현황 페이지</h2>
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
          {UserReviewData?.map((review) => (
            <tr>
              <td>{review.review_no}</td>

              <td>
                <Link to={`/review/${review.review_no}/`}>{review.title}</Link>
              </td>

              <td>{review.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserReviewList;
