import { useCallback, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../../App.css';
import 'css/pagination_userManage.css';
import LoadingIndicator from 'LoadingIndicator';

function UserManagementIndex() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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

  const fetchUser = useCallback(
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
    fetchUser(1);
  }, []);

  const handlePageClick = (event) => {
    fetchUser(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleBTNPress = () => {
    fetchUser(1, query);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchUser(1, query);
    }
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [userData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [userData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="bg-white rounded-xl shadow-md px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote className="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span className="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span className="relative text-white">" 회원 관리 "</span>
            </span>
          </blockquote>

          <div className="mb-6 mt-10">
            <div className="xs:flex-none xl:flex xl:justify-between">
              <div></div>
              <div className="xs:mt-5 xl:mt-0">
                <div className="flex justify-center">
                  <input
                    type="text"
                    name="query"
                    onChange={getQuery}
                    onKeyPress={handleKeyPress}
                    className="rounded bg-gray-100 focus:outline-none focus:border-gray-400 w-72 text-base px-3 py-2 mr-4 border-2"
                    placeholder="ID, 이름, nickname으로 검색하세요."
                  />
                  <button
                    onClick={handleBTNPress}
                    className="rounded bg-blue-900 hover:bg-blue-500 border-blue-900 hover:border-blue-500 text-xl text-white w-24 px-3 py-2 border-2"
                    readOnly
                  >
                    검색
                  </button>
                </div>
                <div className="flex justify-center">
                  {loading && <LoadingIndicator>검색 중 ...</LoadingIndicator>}
                  {error && (
                    <h2 className="">
                      검색 중 에러가 발생했습니다. (검색 결과가 없습니다.)
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </div>

          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="mb-5">
            <table className="mb-5 border text-center min-w-full divide-y divide-gray-200 whitespace-nowrap">
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
                    <tr
                      onClick={() =>
                        navigate(`/admin/usermanage/${user.userID}/`)
                      }
                      className=" cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {user.userID}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {user.nickname}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-lg font-medium text-gray-900">
                          {user?.region}
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
