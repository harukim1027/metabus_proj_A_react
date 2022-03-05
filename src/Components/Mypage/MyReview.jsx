import { useApiAxios } from 'api/base';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import LoadingIndicator from 'LoadingIndicator';

function MyReview() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  // 페이징
  const [query, setQuery] = useState('');
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // get 요청
  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const fetchReview = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: auth.userID,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchReview(1);
  }, []);

  const handlePageClick = (event) => {
    fetchReview(event.selected + 1);
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [reviewList]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [reviewList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 mypage_header rounded-xl shadow-md overflow-hidden sm:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block">
              <span class="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                " 내 작성글 "
              </span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다.조회하고자 하는 정보를 다시 확인해주세요.
            </div>
          )}
          <div className="mb-5 overflow-hidden">
            <table className="mt-3 mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="xs:px-1 sm:px-3 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider"
                  >
                    작성자
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    작성일
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {reviewList && (
                  <>
                    {reviewList.results
                      .filter((a) => a.user.userID === auth.userID)
                      .map((review) => (
                        <tr
                          key={review.review_no}
                          onClick={() =>
                            navigate(`/review/${review.review_no}/`)
                          }
                          className="cursor-pointer"
                        >
                          <td className="py-4 lg:text-xl md:text-base sm:text-sm xs:text-xxs">
                            {review.review_no}
                          </td>
                          <td className="py-4 font-semibold lg:text-xl md:text-md sm:text-sm xs:text-xxs">
                            <span className="bg-purple-100 rounded-full">
                              {review.title.length > 15
                                ? review.title.substring(0, 15) + '...'
                                : review.title}
                            </span>
                          </td>
                          <td className="px-3 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs whitespace-nowrap">
                            {review.user.nickname}
                          </td>
                          <td className="py-4 sm:text-sm xs:text-xxs">
                            {review.created_at}
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="pagination_review"
          />
        </div>
      </div>
    </>
  );
}

export default MyReview;
