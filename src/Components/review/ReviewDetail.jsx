import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import TopNav from 'Components/Main/TopNavi';

function ReviewDetail({ reviewId }) {
  const [{ data: review }, refetch] = useApiAxios(
    `/review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <TopNav />
      {review && (
        <>
          <h1>{review.title}</h1>
          {review.image1 && <img src={review.image1} alt={review.image1} />}
          <h2>{review.content}</h2>
        </>
      )}
      <Link to="/review/">목록으로</Link>
      <Link to={`/review/${reviewId}/edit/`}>수정하기</Link>
      <button>삭제하기</button>
    </div>
  );
}

export default ReviewDetail;
