import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../../App.css';
import './userManage.css';
import 'css/pagination_review.css';

function UserReviewList({ userId }) {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const [{ data: UserReviewData, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const fetchNotices = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: userId,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchNotices(1);
  }, []);

  const handlePageClick = (event) => {
    fetchNotices(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNotices(1, query);
    }
  };

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="userManage_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block">
              <span class="relative text-white">" 입양 후기 "</span>
            </span>
          </blockquote>

          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="mb-5">
            <table className="mb-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-44">
                    번호
                  </th>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/2">
                    제목
                  </th>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                    등록 일시
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {UserReviewData?.results
                  .filter((review) => review.user.userID === userId)
                  .map((review) => (
                    <tr>
                      <td className="py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {review.review_no}
                        </div>
                      </td>

                      <td className="py-4">
                        <div
                          className="text-lg font-medium text-gray-900 cursor-pointer"
                          onClick={() =>
                            navigate(`/review/${review.review_no}/`)
                          }
                        >
                          <span className="inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-purple-800">
                            {review.title}
                          </span>
                        </div>
                      </td>

                      <td className="py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {review.created_at}
                        </div>
                      </td>
                    </tr>
                  ))}
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

export default UserReviewList;
