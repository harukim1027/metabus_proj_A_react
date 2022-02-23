import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
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
      <div className="header">
        <div className="justify-center mx-20">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md">
              <blockquote className="mt-5 text-4xl mb-3 font-semibold italic text-center text-slate-900">
                <span className="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 relative inline-block">
                  <span className="relative text-white">" 내 입양후기 "</span>
                </span>
              </blockquote>

              <div className="mb-5 overflow-hidden border-b border-gray-200">
                <table className="mt-3 mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        제목
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        작성자
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        작성일자
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviewList && (
                      <>
                        {reviewList
                          .filter((a) => a.user.userID === auth.userID)
                          .map((review) => (
                            <tr key={review.review_no}>
                              <td className="px-6 py-4 whitespace-nowrap ">
                                <span className="rounded-full bg-green-100 text-green-800">
                                  <Link to={`/review/${review.review_no}/`}>
                                    {review.title}
                                  </Link>
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/review/${review.review_no}/`}>
                                  by: {review.user.nickname}
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {review.created_at}
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPageReview;
