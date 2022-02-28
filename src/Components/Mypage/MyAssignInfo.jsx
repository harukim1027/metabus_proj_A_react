import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';
import 'css/pagination_assignList.css';
import ReactPaginate from 'react-paginate';
import LoadingIndicator from 'LoadingIndicator';

function MyAssignInfo() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const itemsPerPage = 2;

  const [{ data: MyAssignData, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/`,
      method: 'GET',
    },
    { manual: true },
  );

  const fetchAssign = useCallback(async (newPage, newQuery = query) => {
    const params = {
      page: newPage,
      query: auth.userID,
    };
    const { data } = await refetch({ params });
    setPage(newPage);
    setPageCount(Math.ceil(data.count / itemsPerPage));
    setCurrentItems(data?.results);
  }, []);

  useEffect(() => {
    fetchAssign(1);
  }, []);

  const handlePageClick = (event) => {
    fetchAssign(event.selected + 1);
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [MyAssignData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [MyAssignData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mypage_header rounded-xl shadow-md overflow-hidden sm:px-20 pt-5 pb-10 my-10  xl:w-2/3 lg:w-2/3 md:w-3/4 sm:w-w-full xs:w-full">
          <blockquote class="mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-400 relative inline-block">
              <span class="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                " 내 입양신청 "
              </span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
            </div>
          )}

          {/* table 시작 */}
          <div className="mb-5 overflow-hidden border-b border-gray-200">
            <table className="mb-5 mr-5 mt-3 border text-center min-w-full divide-y divide-gray-200">
              {' '}
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                  >
                    신청 번호
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                  >
                    동물 번호
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                  >
                    신청 날짜
                  </th>
                  <th
                    scope="col"
                    className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs border border-slate-200 bg-gray-50 px-4 py-3 text-center  font-bold text-gray-500 uppercase tracking-wider w-72"
                  >
                    진행 상태
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MyAssignData?.results.map((assign) => (
                  <tr
                    onClick={() =>
                      navigate(`/assignment/${assign.assignment_no}/`)
                    }
                    className="cursor-pointer"
                  >
                    <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs ">
                      {assign.assignment_no}
                    </td>

                    <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs">
                      {assign.animal.animal_reg_num}
                    </td>

                    <td className="px-6 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-xs">
                      {assign.created_at}
                    </td>

                    <td
                      className={
                        assign.status === '입양 완료'
                          ? 'text-orange-300 font-bold px-6 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm'
                          : 'px-6 py-4 xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm'
                      }
                    >
                      {assign.status}
                      {assign.status === '입양 완료' && (
                        <button
                          className="icon_size2 ml-6"
                          onClick={() => navigate('/review/new/')}
                        >
                          <img
                            className="transition transform hover:-translate-y-1"
                            src="/pen2.png"
                            alt="button"
                          ></img>
                        </button>
                      )}
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
            className="pagination_assignList "
          />
        </div>
      </div>
    </>
  );
}

export default MyAssignInfo;
