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
        query: auth.is_staff ? newQuery : auth.userID,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchInquiry(1, query);
    }
  };

  // 스크롤 기능
  const [scrollY, setScrollY] = useState(0);
  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 940,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
  };

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });
  // console.log('window Scroll From Top:', scrollY);

  useEffect(() => {
    gotoTop();
  }, [inquiryList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block">
              <span class="relative text-white">" 1:1 문의 "</span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
            </div>
          )}

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
                className="relative rounded p-3 text-m mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/3 px-3 md:mb-0"
              />
              {errorMessages.query?.map((message, index) => (
                <p key={index} className="text-m text-red-400">
                  {message}
                </p>
              ))}
              <button
                type="submit"
                className="relative ml-2 mr-4 flex-shrink-0 bg-yellow-300 hover:bg-yellow-700 border-yellow-300 hover:border-yellow-700 text-xl border-4 text-white px-3 py-2 rounded"
                onClick={() => handleKeyPress()}
              >
                검색
              </button>
              {/* 저장 에러  */}
              <div>
                {loading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
                {error &&
                  `저장 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <table className="mb-5 border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-32"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-44"
                  >
                    아이디
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/3"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                  >
                    문의 일자
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
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
                        <span className="px-2 inline-flex text-s leading-5 cursor-pointer font-semibold rounded-full bg-green-100 text-green-800">
                          {inquiry.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-lg font-medium text-gray-900">
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
