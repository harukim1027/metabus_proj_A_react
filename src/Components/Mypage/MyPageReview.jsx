import { useApiAxios } from 'api/base';
import ReviewSummary from 'Components/review/ReviewSummary';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from 'contexts/AuthContext';

function MyPageReview() {
  const { auth } = useAuth();
  const [{ data: reviewList }, refetch] = useApiAxios(
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
    <>
      <Sidebar />
      <div className="w-full h-screen bg-blue-100">
        <div className="flex justify-center">
          <div className="inline-block mt-10">
            <div className="inline-block">
              {reviewList && (
                <div className="flex space-x-1">
                  {reviewList
                    .filter((a) => a.user.userID === auth.userID)
                    .map((review) => (
                      <div
                        key={review.review_no}
                        className="mx-20 md:w-1/4 l:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300 "
                      >
                        <Link to={`/review/${review.review_no}/`}>
                          <h2>{review.title}</h2>
                          <h3>by: {review.user.nickname}</h3>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPageReview;
