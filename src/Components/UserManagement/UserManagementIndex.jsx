import { useCallback, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../../App.css';
import 'css/pagination_userManage.css';

function UserManagementIndex() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/`,
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
    fetchNotices(1);
  }, []);

  const handlePageClick = (event) => {
    fetchNotices(event.selected + 1);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNotices(1, query);
    }
  };

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="bg-white rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote className="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span className="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span className="relative text-white">" 회원 관리 "</span>
            </span>
          </blockquote>

          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="ml-3 mb-6 mt-3">
            <div className="text-right">
              <input
                type="text"
                placeholder="아이디,이름,닉네임으로 검색"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="relative rounded p-3 text-m mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/3 px-3 md:mb-0"
              />
              <button
                type="submit"
                onClick={() => refetch()}
                className="relative ml-2 mr-4 flex-shrink-0 bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-xl border-4 text-white px-3 py-2 rounded"
              >
                검색
              </button>
            </div>
          </div>

          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="mb-5">
            <table className="mb-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    유저아이디
                  </th>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    이름
                  </th>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    닉네임
                  </th>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    거주지역
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {userData &&
                  userData.results.map((user) => (
                    <tr>
                      <td className="py-4">
                        <div
                          className="text-lg font-medium text-gray-900 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/usermanage/${user.userID}/`)
                          }
                        >
                          {user.userID}
                        </div>
                      </td>

                      <td className="py-4">
                        <div
                          className="text-lg font-medium text-gray-900 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/usermanage/${user.userID}/`)
                          }
                        >
                          {user.name}
                        </div>
                      </td>

                      <td className="py-4">
                        <div
                          className="text-lg font-medium text-gray-900 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/usermanage/${user.userID}/`)
                          }
                        >
                          {user.nickname}
                        </div>
                      </td>

                      <td className="py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {user?.region === '서울' && '서울'}
                          {user?.region === '인천' && '인천'}
                          {user?.region === '대전' && '대전'}
                          {user?.region === '세종' && '세종'}
                          {user?.region === '대구' && '대구'}
                          {user?.region === '부산' && '부산'}
                          {user?.region === '광주' && '광주'}
                          {user?.region === '울산' && '울산'}
                          {user?.region === '제주' && '제주'}
                          {user?.region === '강원' && '강원'}
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
            className="pagination_userManage"
          />
        </div>
      </div>
    </>
  );
}

export default UserManagementIndex;
