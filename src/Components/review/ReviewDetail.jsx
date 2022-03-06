import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import '../../App.css';
import './Review.css';
import LoadingIndicator from 'LoadingIndicator';

function ReviewDetail({ reviewId }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteReview] =
    useApiAxios(
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

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [review]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [review]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 review_header rounded-xl shadow-md overflow-hidden pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-3 mb-10 font-semibold italic text-center text-slate-900">
            <span class="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl ">
              <span class="relative text-white">" 입양후기 "</span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {loading && (
            <>
              <p className="text-blue-400">&nbsp;&nbsp;로딩 중...</p>
            </>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}

          <div className="flex justify-center">
            <div className="px-4 py-5 xs:w-full sm:w-2/3">
              {review && (
                <>
                  <h1
                    className={
                      review.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {review.title}
                  </h1>
                  <hr className="mt-3 mb-3" />

                  {/* 입양한 동물 정보 박스 */}
                  <div className="flex justify-center">
                    <div className="inline-block rounded-md shadow-md overflow-hidden mx-4 my-4 w-96 h-full">
                      <div className="sm:flex sm:justify-center">
                        <div className="overflow-hidden">
                          <img
                            src={review.adoptassignment.animal.image}
                            alt=""
                            className="assign_photo w-full h-full"
                          />
                        </div>

                        <div className="flex justify-center">
                          <ul className="assign_table_bg border-gray-200 w-60">
                            <li className="pl-1 pr-1 py-1 flex items-center justify-between text-sm border-t-2">
                              품종 : {review.adoptassignment.animal.category}
                            </li>
                            <li className="pl-1 pr-1 py-1 flex items-center justify-between text-sm border-t-2">
                              사이즈 : {review.adoptassignment.animal.size}
                            </li>
                            <li className="pl-1 pr-1 py-1  flex items-center justify-between text-sm border-t-2">
                              성별 : {review.adoptassignment.animal.sex}
                            </li>
                            <li className="pl-1 pr-1 py-1  flex items-center justify-between text-sm border-t-2">
                              나이 : {review.adoptassignment.animal.age}
                            </li>
                            <li className="pl-1 pr-1 py-1  flex items-center justify-between text-sm border-t-2">
                              특징 : {review.adoptassignment.animal.info}
                            </li>
                            <li className="pl-1 pr-1 py-1  flex items-center justify-between text-sm border-t-2">
                              입양일 : {review.adoptassignment.date_to_meet}
                            </li>
                            <li className="pl-1 pr-1 py-1  flex items-center justify-between text-sm border-t-2">
                              등록 번호 :
                              {review.adoptassignment.animal.animal_reg_num}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="mb-4 flex justify-center">
                    {review.image1 && (
                      <img src={review.image1} alt="" className="w-full" />
                    )}
                  </div>

                  <div className="mb-4 flex justify-center">
                    {review.image2 && (
                      <img src={review.image2} alt="" className="w-full" />
                    )}
                  </div>
                  <div className="mb-4 flex justify-center">
                    {review.image3 && (
                      <img src={review.image3} alt="" className="w-full" />
                    )}
                  </div>

                  <div className="mb-4 flex justify-center">
                    {review.image4 && (
                      <img src={review.image4} alt="" className="w-full" />
                    )}
                  </div>
                  <div className="mb-4 flex justify-center">
                    {review.image5 && (
                      <img src={review.image5} alt="" className="w-full" />
                    )}
                  </div>

                  {/*  */}

                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-lg text-gray-900 whitespace-pre-wrap">
                    {review.content}
                  </h2>
                  <br />
                  <hr className="mt-3 mb-3" />

                  <div className="my-5 text-right">
                    {(auth.userID === review.user.userID || auth.is_staff) && (
                      <button
                        className="ml-3 flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete()}
                      >
                        삭제
                      </button>
                    )}
                    {auth.userID === review.user.userID && (
                      <Link
                        className="ml-3 flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
                        to={`/review/${reviewId}/edit/`}
                      >
                        수정
                      </Link>
                    )}
                    <Link
                      className="ml-3 flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
                      to="/review/"
                    >
                      목록
                    </Link>

                    {deleteLoading && (
                      <LoadingIndicator>삭제 중 ...</LoadingIndicator>
                    )}
                    {deleteError && `삭제 요청 중 에러가 발생했습니다.`}
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
