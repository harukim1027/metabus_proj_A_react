import { useApiAxios } from 'api/base';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';

function MyPageReview() {
  const { auth } = useAuth();

  // 페이징
  const [query, setQuery] = useState('');
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const fetchInquiry = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchInquiry(1);
  }, []);

  const handlePageClick = (event) => {
    fetchInquiry(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
      fetchInquiry(1, query);
      console.log('ENTER');
    }
  };

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
      <div className="header w-full h-screen">
        <div className="flex flex-wrap justify-center w-full">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-10">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-10">
              <div className="notice_header rounded-xl shadow-md">
                <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
                  <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block">
                    <span class="relative text-white">" 내가 쓴 후기 "</span>
                  </span>
                </blockquote>
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className="relative rounded p-3 text-m  bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/2 px-3 md:mb-0"
                />
                <button
                  type="submit"
                  className="relative ml-2 mr-2 flex-shrink-0 bg-yellow-400 shadow-md hover:bg-yellow-700 border-yellow-400 hover:border-yellow-700 text-xl border-4 text-white py-1 rounded"
                  onClick={() => refetch()}
                >
                  검색
                </button>
              </div>
            </div>
            <div className="mb-5  overflow-hidden border-b border-gray-200">
              {reviewList && (
                <div className="flex space-x-1">
                  {reviewList.results
                    .filter((filt) => filt.user.userID === auth.userID)
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
      </div>
    </>
  );
}

export default MyPageReview;
