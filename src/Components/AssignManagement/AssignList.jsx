import { useApiAxios } from 'api/base';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useAuth } from 'contexts/AuthContext';
import LoadingIndicator from 'LoadingIndicator';

function AssignList() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [query, setQuery] = useState(null);
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // get요청
  const [{ data: assignList, loading, error, errorMessages }, refetch] =
    useApiAxios(
      {
        url: `/adopt_assignment/api/assignment/`,
        method: 'GET',
      },
      { manual: true },
    );

  const fetchAssign = useCallback(
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
    fetchAssign(1);
  }, []);

  const handlePageClick = (event) => {
    fetchAssign(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleBTNPress = () => {
    fetchAssign(1, query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchAssign(1, query);
    }
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [assignList]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [assignList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="my-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-400 relative inline-block">
              <span class="relative text-white">" 입양신청 목록 "</span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
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

          <div className="ml-3 mb-6 mt-3">
            <div className="flex justify-between">
              <div></div>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="query"
                  onChange={getQuery}
                  onKeyPress={handleKeyPress}
                  className="rounded bg-gray-100 focus:outline-none focus:border-gray-400 w-72 text-xxs px-3 py-2 mr-4 border-2"
                  placeholder="(번호, 등록번호, 신청자명, ID, 닉네임) 중 검색"
                />
                <button
                  onClick={handleBTNPress}
                  className="rounded bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-xl text-white w-24 px-3 py-2 border-2"
                  readOnly
                >
                  검색
                </button>
              </div>
            </div>
            {loading && <LoadingIndicator>'조회 중 ...'</LoadingIndicator>}
            {error && '조회 중 오류가 발생했습니다. 조회된 정보가 없습니다.'}
          </div>
          <div className="mb-5">
            {assignList && (
              // 테이블로 표현한 방식 (assignment와 다르게 해볼 예정)
              <>
                <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3 text-center text-lg font-bold text-gray-500 tracking-wider"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center text-lg font-bold text-gray-500 tracking-wider"
                      >
                        신청자명
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center text-lg font-bold text-gray-500 tracking-wider"
                      >
                        신청한 동물 번호
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center text-lg font-bold text-gray-500 tracking-wider"
                      >
                        입양 희망 날짜
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center text-lg font-bold text-gray-500 uppercase tracking-wider"
                      >
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignList?.results?.map((assign) => (
                      <tr
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/admin/assignmanage/${assign.assignment_no}`,
                          )
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xl font-medium text-gray-900">
                            {assign.assignment_no}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full">
                              {assign.adopter_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-blue-100">
                              {assign.animal.animal_reg_num}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="">{assign.date_to_meet}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-blue-800">
                              {assign.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
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
            className="pagination_assignList"
          />
        </div>
      </div>
    </>
  );
}

export default AssignList;
