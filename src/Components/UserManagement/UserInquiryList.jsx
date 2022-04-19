import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_inquiry.css';
import '../../App.css';
import './userManage.css';

function UserInquiryList({ userId }) {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [{ data: UserInquiryData, loading, error }, refetch] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/`,
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
        author: userId,
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

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [UserInquiryData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [UserInquiryData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="userManage_header rounded-xl shadow-md px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block">
              <span class="relative text-white">" 1:1문의 "</span>
            </span>
          </blockquote>

          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="mb-5">
            <table className="mb-5 mt-10 border text-center min-w-full divide-y divide-gray-200 w-full whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xl font-bold text-gray-500 tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xl font-bold text-gray-500 tracking-wider"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-lg font-bold text-gray-500 tracking-wider"
                  >
                    등록 일시
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-lg font-bold text-gray-500 tracking-wider"
                  >
                    답변 여부
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {UserInquiryData?.results.map((inquiry) => (
                  <tr
                    className=" cursor-pointer"
                    onClick={() => navigate(`/inquiry/${inquiry.inquiry_no}/`)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-base font-medium text-gray-900">
                        {inquiry.inquiry_no}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        <span className="inline-flex text-lg leading-5 font-semibold rounded-full bg-yellow-100">
                          {inquiry.title.length > 15
                            ? inquiry.title.substring(0, 15) + '...'
                            : inquiry.title}
                        </span>
                      </div>
                    </td>

                    <td className="text-sm px-6 py-4">{inquiry.created_at}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="text-base font-medium text-gray-900">
                          {inquiry.admin_answer.length > 0 ? (
                            <>
                              <div className="text-xxs flex justify-center">
                                <img src="/check.png" width="15" alt="" />
                              </div>
                              <span className="text-xxs">답변 완료</span>
                            </>
                          ) : (
                            <>
                              <div className="text-xxs flex justify-center">
                                <img src="/nocheck.png" width="15" alt="" />
                              </div>
                              <span className="text-xxs">답변 대기</span>
                            </>
                          )}
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

export default UserInquiryList;
