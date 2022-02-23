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
                        글 번호
                      </th>
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
                        {reviewList.results
                          .filter((a) => a.user.userID === auth.userID)
                          .map((review) => (
                            <tr key={review.review_no}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {review.review_no}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap ">
                                <span className="px-2 rounded-full bg-green-100 text-green-800 font-semibold">
                                  <Link to={`/review/${review.review_no}/`}>
                                    {review.title}
                                  </Link>
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/review/${review.review_no}/`}>
                                  {review.user.nickname}
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
