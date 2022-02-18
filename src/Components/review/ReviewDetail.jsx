import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';
import '../../App.css';
import './Review.css';

function ReviewDetail({ reviewId }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  const [{}, deleteReview] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteReview().then(() => {
        navigate('/review/');
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="header">
        <div className="flex flex-wrap justify-center max-w-m">
          <div className="header justify-center rounded px-20 pt-6 mb-3">
            <div className="review_header shadow-md overflow-hidden sm:rounded-lg">
              <blockquote class="mt-5 text-3xl font-semibold italic text-center text-slate-900">
                <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                  <span class="relative text-white">" 입양후기 "</span>
                </span>
              </blockquote>
              <div className="px-4 py-5 sm:px-6">
                {review && (
                  <>
                    <h1 className="text-lg leading-6 font-bold text-gray-900">
                      {review.title}
                    </h1>
                    <hr className="mt-3 mb-3" />

                    <div className="mb-4">
                      {review.image1 && (
                        <img src={review.image1} alt={review.image1} />
                      )}
                      {review.image2 && (
                        <img src={review.image2} alt={review.image2} />
                      )}
                      {review.image3 && (
                        <img src={review.image3} alt={review.image3} />
                      )}
                      {review.image4 && (
                        <img src={review.image4} alt={review.image4} />
                      )}
                      {review.image5 && (
                        <img src={review.image5} alt={review.image5} />
                      )}
                    </div>

                    <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-sm text-gray-500">
                      {review.content}
                    </h2>
                    <hr className="mt-3 mb-3" />

                    <div className="my-5 text-right">
                      <Link
                        className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        to="/review/"
                      >
                        목록으로
                      </Link>

                      {auth.userID === review.user.userID && (
                        <Link
                          className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                          to={`/review/${reviewId}/edit/`}
                        >
                          수정하기
                        </Link>
                      )}
                      {auth.userID === review.user.userID && (
                        <button
                          className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                          onClick={() => handleDelete()}
                        >
                          삭제하기
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewDetail;
