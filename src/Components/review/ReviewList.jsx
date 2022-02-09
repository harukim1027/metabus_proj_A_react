import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import ReviewSummary from './ReviewSummary';

function ReviewList() {
  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="my-5 ">
      {reviewList && (
        <div className="flex space-x-1">
          {reviewList.map((review) => (
            <div key={review.review_no}>
              {review.title}
              <p>{review.user}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ReviewList;
