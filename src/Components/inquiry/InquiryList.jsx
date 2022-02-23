import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function InquiryList() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const [{ data: inquiryList }, refetch] = useApiAxios(
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

  useEffect(() => {
    refetch();
  }, []);

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
      <div className="header">
        <div className="flex flex-wrap justify-center w-full">
          <div className="review_header my-2 overflow-x-auto shadow-md mb-10 rounded-2xl pb-5">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-10">
              <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
                <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block">
                  <span class="relative text-white">" 1:1 문의 "</span>
                </span>
              </blockquote>

              <div className="ml-5 mb-5 mt-5 mr-3">
                <div className="text-right">
                  <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="relative rounded p-3 text-m  bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/2 px-3 md:mb-0"
                  />
                  <button
                    type="submit"
                    className="relative ml-2 mr-2 flex-shrink-0 bg-yellow-400 shadow-md hover:bg-yellow-600 border-yellow-400 hover:border-yellow-600 text-xl border-4 text-white py-1 rounded"
                    onClick={() => refetch()}
                  >
                    검색
                  </button>
                </div>
              </div>

              <div className="mb-5  overflow-hidden border-b border-gray-200">
                {inquiryList && (
                  <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                        >
                          문의 번호
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                        >
                          아이디
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
                      {inquiryList?.results?.map((inquiry) => (
                        <>
                          {(auth.userID === inquiry.user || auth.is_staff) && (
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {inquiry.inquiry_no}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {inquiry.user}
                                  </div>
                                </div>
                              </td>

                              <td
                                className="px-6 py-4 whitespace-nowrap"
                                onClick={() =>
                                  navigate(`/inquiry/${inquiry.inquiry_no}/`)
                                }
                              >
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    <span className="px-2 inline-flex text-s leading-5 cursor-pointer font-semibold rounded-full bg-green-100 text-green-800">
                                      {inquiry.title}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {inquiry.created_at}
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex justify-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {/* <h2>{inquiry.status}</h2> */}
                                      {inquiry.admin_answer.length > 0 ? (
                                        <div className="text-xs">
                                          <img
                                            src="/check.png"
                                            width="15"
                                            className="ml-4"
                                            alt=""
                                          />{' '}
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
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="flex place-content-between">
              <div></div>
              {auth.isLoggedIn && !auth.is_staff && (
                <button
                  onClick={() => navigate('/inquiry/new/')}
                  className="mx-10 text-white py-1 px-3 rounded-md bg-yellow-400 shadow-md hover:bg-yellow-600 border-yellow-400 hover:border-yellow-600 text-sm border-4 "
                >
                  글쓰기
                </button>
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
      </div>
    </>
  );
}
export default InquiryList;
