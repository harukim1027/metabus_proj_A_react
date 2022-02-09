import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import ReviewSummary from './ReviewSummary';

function ReviewList() {
  const [{ data: reviewList }, refetch] = useApiAxios(
    {
      url: `/review/api/reviews/`,
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
            <div
              key={review.review_no}
              className="w-full md:w-1/4 l:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300 "
            >
              <ReviewSummary review={review} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ReviewList;
