import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

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
      {review && (
        <>
          <h1>{review.title}</h1>
          <h2>{review.content}</h2>
        </>
      )}
    </div>
  );
}

export default ReviewDetail;
