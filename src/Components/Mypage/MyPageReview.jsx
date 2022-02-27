import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import LoadingIndicator from 'LoadingIndicator';

function MyPageReview() {
  const { auth } = useAuth();

  // 페이징
  const [query, setQuery] = useState('');
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

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

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 940,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [reviewList]);

  //-------------

  return (
    <>
      <div className="header">
        <div className="justify-center mx-20">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="mypage_header rounded-xl shadow-md">
              <blockquote className="mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
                <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block">
                  <span class="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                    " 내 입양후기 "
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
                  조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
                </div>
              )}
              <div className="mb-5 overflow-hidden border-b border-gray-200">
                <table className="mt-3 mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                      >
                        글 번호
                      </th>
                      <th
                        scope="col"
                        className="xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                      >
                        제목
                      </th>
                      <th
                        scope="col"
                        className="xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                      >
                        작성자
                      </th>
                      <th
                        scope="col"
                        className="xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                      >
                        작성일자
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviewList && (
                      <>
                        {reviewList.results
                          .filter((a) => a.user.userID === auth.userID)
                          .map((review) => (
                            <tr key={review.review_no}>
                              <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs ">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {review.review_no}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs">
                                <span className="px-2 rounded-full bg-green-100 text-green-800 font-semibold">
                                  <Link to={`/review/${review.review_no}/`}>
                                    {review.title}
                                  </Link>
                                </span>
                              </td>
                              <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs">
                                <Link to={`/review/${review.review_no}/`}>
                                  {review.user.nickname}
                                </Link>
                              </td>
                              <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-m sm:text-s xs:text-xs">
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
            <ReactPaginate
              previousLabel="<"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={itemsPerPage}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              className="pagination_notice"
            />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPageReview;
