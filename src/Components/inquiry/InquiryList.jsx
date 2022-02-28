import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_inquiry.css';
import LoadingIndicator from 'LoadingIndicator';

function InquiryList() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  // get요청
  const [{ data: inquiryList, loading, error, errorMessages }, refetchAll] =
    useApiAxios(
      {
        url: `/inquiry_board/api/inquiry/`,
        method: 'GET',
      },
      {
        manual: true,
      },
    );

  const fetchInquiry = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        author: auth.is_staff ? '' : auth.userID,
      };
      const { data } = await refetchAll({ params });
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

  const handleBTNPress = () => {
    fetchInquiry(1, query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchInquiry(1, query);
    }
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [inquiryList]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [inquiryList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md overflow-hidden md:px-20 pt-5 pb-10 my-10  xl:w-2/3 lg:w-2/3 md:w-3/4 sm:w-w-full xs:w-full">
          <blockquote class="mt-5 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block xs:text-2xl sm:text-4xl md:text-6xl">
              <span class="relative text-white">" 1:1 문의 "</span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && '로딩 중 ...'}

          <div className="ml-3 mb-6 mt-3">
            <div className="text-right">
              {!auth.is_staff && (
                <button
                  onClick={() => navigate('/inquiry/new/')}
                  className=" icon_size float-left ml-10 hover:scale-110"
                  readOnly
                >
                  <img src="/pen.png" alt="button"></img>
                </button>
              )}
              <input
                type="text"
                name="query"
                placeholder="검색어를 입력해주세요."
                onChange={getQuery}
                onKeyPress={handleKeyPress}
                className="relative rounded p-3 text-md mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/3 px-3 md:mb-0"
              />
              {errorMessages.query?.map((message, index) => (
                <p key={index} className="text-md text-red-400">
                  {message}
                </p>
              ))}
              <button
                type="submit"
                className="relative ml-2 mr-4 flex-shrink-0 bg-yellow-300 hover:bg-yellow-700 border-yellow-300 hover:border-yellow-700 text-xl border-4 text-white px-3 py-2 rounded"
                onClick={handleBTNPress}
              >
                검색
              </button>
              <div>
                {loading && <LoadingIndicator>검색 중 ...</LoadingIndicator>}
                {error && '검색된 정보가 없습니다.'}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <table className="mb-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3 text-center font-bold text-gray-500 uppercase tracking-wider xs:w-10 xs:text-sm sm:w-32 sm:text-lg"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center font-bold text-gray-500 uppercase tracking-wider w-44 xs:text-xs sm:text-lg"
                  >
                    아이디
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center xs:text-sm sm:text-lg font-bold text-gray-500 uppercase tracking-wider w-1/3"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center xs:text-sm sm:text-md font-bold text-gray-500 uppercase tracking-wider"
                  >
                    문의일
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-center xs:text-sm sm:text-md font-bold text-gray-500 uppercase tracking-wider"
                  >
                    답변 상태
                  </th>
                </tr>
              </thead>
              <tbody className="bg-red divide-y divide-gray-200">
                {inquiryList?.results.map((inquiry) => (
                  <tr
                    onClick={() => navigate(`/inquiry/${inquiry.inquiry_no}/`)}
                    className="cursor-pointer"
                  >
                    <td className="py-4">
                      <div className="text-lg font-medium text-gray-900">
                        {inquiry.inquiry_no}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-lg font-medium text-gray-900">
                        {inquiry.user}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="text-lg font-medium text-gray-900">
                        <span className="px-2 inline-flex text-sm leading-5 cursor-pointer font-semibold rounded-full bg-green-100 text-green-800">
                          {inquiry.title.length > 8
                            ? inquiry.title.substring(0, 8) + '...'
                            : inquiry.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="py-4 xs:text-xs lg:text-md">
                        {inquiry.created_at}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <div className="ml-4">
                          <div className="text-xl font-medium text-gray-900">
                            {/* <h2>{inquiry.status}</h2> */}
                            {inquiry.admin_answer.length > 0 ? (
                              <div className="text-xs">
                                <img
                                  src="/check.png"
                                  width="15"
                                  className="ml-4"
                                  alt=""
                                />
                                답변 완료
                              </div>
                            ) : (
                              <div className="text-xs">
                                <img
                                  src="/nocheck.png"
                                  width="15"
                                  className="ml-4"
                                  alt=""
                                />
                                답변 대기
                              </div>
                            )}
                          </div>
                        </div>
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
            className="pagination_inquiry"
          />
        </div>
      </div>
    </>
  );
}
export default InquiryList;
