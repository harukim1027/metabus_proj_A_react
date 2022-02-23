import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

  // console.log('review', review);

  return (
    <>
      <div className="header flex justify-center">
        <div className="w-11/12 rounded-xl my-10 mb-10 shadow-md notice_header overflow-hidden">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
              <span class="relative text-white text-6xl">" 입양후기 "</span>
            </span>
          </blockquote>
          <div className="flex justify-center">
            <div className="px-4 py-5 w-2/3">
              {review && (
                <>
                  <h1 className="text-3xl leading-6 font-bold text-gray-900">
                    {review.title}
                  </h1>
                  <hr className="mt-3 mb-3" />
                  <div className="flex border-2 border-gray-300 rounded-lg text-gray-400">
                    <img
                      src={review.adoptassignment.animal.image}
                      className="w-1/6"
                      alt=""
                    />
                    <div className="ml-20 px-20 py-4">
                      <ul className="flex justify-center ml-20 h-10">
                        <li className="mt-2 px-2 border-gray-200">
                          <span className="font-medium"> 품종 : </span>
                          {review.adoptassignment.animal.category}
                        </li>
                        <li className="mt-2 px-2 border-l-2 border-gray-200">
                          사이즈 : {review.adoptassignment.animal.size}
                        </li>
                        <li className="mt-2 px-2 border-l-2 border-gray-200">
                          성별 : {review.adoptassignment.animal.sex}
                        </li>
                        <li className="mt-2 px-2 border-l-2 border-gray-200">
                          나이 : {review.adoptassignment.animal.age}
                        </li>
                      </ul>

                      <ul className="flex mx-5">
                        <li className="mt-2 px-2 border-gray-200 ">
                          건강상태 :{' '}
                          {review.adoptassignment.animal.physical_condition}
                        </li>
                        <li className="mt-2 px-2 border-l-2 border-gray-200">
                          입양일 : {review.adoptassignment.animal.end_date}
                        </li>
                        <li className="mt-2 px-2 border-l-2 border-gray-200">
                          등록 번호 :{' '}
                          {review.adoptassignment.animal.animal_reg_num}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <br />

                  <div className="mb-4 flex justify-center">
                    {review.image1 && (
                      <img
                        src={review.image1}
                        alt={review.image1}
                        className="w-full"
                      />
                    )}
                  </div>

                  <div>
                    {review.image2 && (
                      <img src={review.image2} alt={review.image2} />
                    )}
                  </div>
                  <div>
                    {review.image3 && (
                      <img src={review.image3} alt={review.image3} />
                    )}
                  </div>

                  <div>
                    {review.image4 && (
                      <img src={review.image4} alt={review.image4} />
                    )}
                  </div>
                  <div>
                    {review.image5 && (
                      <img src={review.image5} alt={review.image5} />
                    )}
                  </div>

                  {/*  */}

                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-lg text-gray-900">
                    {review.content}
                  </h2>
                  <br />
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
                    {(auth.userID === review.user.userID || auth.is_staff) && (
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
    </>
  );
}

export default ReviewDetail;
