import { useEffect } from 'react';
import { useApiAxios } from 'api/base';

function ReviewList() {
  const [{ data: reviewList }, refetch] = useApiAxios(`/review/api/reviews/`);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="my-5 ">
      {reviewList && reviewList.map((reviews) => <div>key={reviews.id}</div>)}
    </div>
  );
}
export default ReviewList;
