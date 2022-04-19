import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIndicator from 'LoadingIndicator';

function InquiryDetail({ inquiryId }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  //method 지정을 안하면 -> get 요청이 default
  const [{ data: inquiry, loading, error }, refetch] = useApiAxios(
    `/inquiry_board/api/inquiry/${inquiryId}/`,
    { manual: true },
  );

  // gelete
  const [{}, deleteInquiry] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/${inquiryId}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteInquiry().then(() => {
        (auth.is_staff && navigate('/inquiry/')) ||
          (!auth.is_staff && navigate('/mypage/myinquiry/'));
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [inquiry]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [inquiry]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 notice_header rounded-xl shadow-md md:px-20 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-5 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block xs:text-2xl sm:text-4xl md:text-6xl">
              <span class="relative text-white">" 1:1 문의 "</span>
            </span>
          </blockquote>

          <hr />
          {/* 로딩 에러 */}
          {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
          {error && '로딩 중 에러가 발생했습니다.'}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
            </div>
          )}

          <div className="flex justify-center">
            <div className="py-5 w-2/3">
              {inquiry && (
                <>
                  <div>
                    <span className="xs:text-base md:text-xl font-bold mb-5">
                      문의 제목
                    </span>
                  </div>

                  <span
                    className={
                      inquiry.title.length > 20
                        ? 'xs:text-base sm:text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'xs:text-base sm:text-xl md:text-3xl leading-6  text-gray-900 tracking-wide'
                    }
                  >
                    : {inquiry.title}
                  </span>
                  <hr className="my-3" />

                  <span className="xs:text-base md:text-xl font-bold">
                    내용
                  </span>
                  <h2
                    readonly
                    className="xs:py-5 md:w-full text-2xl text-gray-500 xs:text-base sm:text-2xl whitespace-pre-wrap"
                  >
                    {inquiry.content}
                  </h2>

                  <hr className="mt-5 my-3 border border-gray-400 text-center" />

                  <span className="xs:text-base md:text-xl font-bold">
                    답변
                  </span>
                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-2xl text-gray-500 xs:text-base sm:text-2xl">
                    {inquiry.admin_answer}
                  </h2>
                  <div className="mb-10">
                    {inquiry.admin_answer === '' && (
                      <span className="mb-5 text-center xs:text-xxs md:text-base lg:text-lg text-red-400 font-extrabold">
                        😅 아직 답변이 준비되지 않았어요! <br />
                        조금만 기다려 주시면 답변을 달아드릴게요!
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="my-5 text-right mr-5">
              <div>
                {(auth.userID === inquiry?.user || auth.is_staff) && (
                  <button
                    onClick={() => handleDelete()}
                    className="mt-10 ml-3 flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    삭제
                  </button>
                )}
                {auth.isLoggedIn && auth.is_staff && (
                  <Link
                    to={`/admin/inquiry/${inquiryId}/edit/`}
                    className="mt-10 ml-3 flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    답변
                  </Link>
                )}
                {auth.is_staff ? (
                  <Link
                    to="/inquiry/"
                    className="mt-10 ml-3 flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    목록
                  </Link>
                ) : (
                  <Link
                    to="/mypage/myinquiry/"
                    className="mt-10 ml-3 flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    목록
                  </Link>
                )}

                {/* 저장 에러  */}
                <div>
                  {loading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
                  {error && (
                    <>
                      {/* 로딩 에러 */}
                      <p className="text-red-400">
                        &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
                      </p>
                      `저장 중 에러가 발생했습니다. (${error.response?.status} $
                      {error.response?.statusText})`
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InquiryDetail;
