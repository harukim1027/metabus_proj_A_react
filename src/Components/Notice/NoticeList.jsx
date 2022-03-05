import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import '../../App.css';
import './Notice.css';
import 'css/pagination_notice.css';
import LoadingIndicator from 'LoadingIndicator';
function NoticeList() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [{ data: noticeList, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/`,
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
  const getQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleBTNPress = () => {
    fetchNotices(1, query);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNotices(1, query);
    }
  };
  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [noticeList]);
  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    gotoTop();
  }, [noticeList]);
  //-------------
  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 notice_header rounded-xl shadow-md overflow-hidden sm:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block  xs:text-2xl sm:text-4xl lg:text-6xl">
              <span class="relative text-white">" 공지사항 "</span>
            </span>
          </blockquote>
          <hr />
          <div className="mb-6 mt-10">
            <div className="  xs:flex-none xl:flex xl:justify-between">
              <div></div>
              <div className="xs:mt-5 xl:mt-0">
                <div className="flex justify-center">
                  <input
                    type="text"
                    name="query"
                    onChange={getQuery}
                    onKeyPress={handleKeyPress}
                    className="rounded bg-gray-100 focus:outline-none focus:border-gray-400 px-3 py-2 mx-4 border-2 xs:w-full sm:w-72 xs:text-xxs sm:text-base"
                    placeholder="제목을 검색하세요."
                  />
                  <button
                    onClick={handleBTNPress}
                    className="rounded bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white px-3 py-2 border-2 w-24 xs:text-sm sm:text-xl mr-2"
                    readOnly
                  >
                    검색
                  </button>
                </div>
                <div className="flex justify-center">
                  {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
                  {error && (
                    <>
                      <p className="text-red-400 mt-1">
                        &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. ! (조회된
                        정보가 없습니다.)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <table className="mb-5 border text-center divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
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
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs border border-slate-200 bg-gray-50 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    작성일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {noticeList?.results?.map((notice) => (
                  <tr
                    onClick={() => navigate(`/notice/${notice.notice_no}/`)}
                    className=" cursor-pointer"
                  >
                    <td className="py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xxs ">
                      <div className="text-sm font-medium text-gray-900">
                        {notice.notice_no}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-gray-900">
                        <span className="inline-flex xs:text-sm md:text-md lg:text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {notice.title.length > 20
                            ? notice.title.substring(0, 20) + '...'
                            : notice.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 sm:text-sm xs:text-xxs">
                      {notice.created_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {auth.is_staff && (
              <div className="flex justify-end mr-5">
                <button
                  onClick={() => navigate('/admin/notice/new/')}
                  className="hover:scale-110 xs:w-10 sm:w-14"
                  readOnly
                >
                  <img src="/pen2.png" alt="button"></img>
                </button>
              </div>
            )}
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
      </div>
    </>
  );
}
export default NoticeList;
