import { useApiAxios } from 'api/base';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useAuth } from 'contexts/AuthContext';

function AssignList() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [query, setQuery] = useState(null);
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="my-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-400 relative inline-block">
              <span class="relative text-white">" 입양신청 목록 "</span>
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
              <input
                type="text"
                name="query"
                onChange={getQuery}
                onKeyPress={handleKeyPress}
                className="relative rounded p-3 text-xl mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/2 px-3 md:mb-0"
                placeholder="제목을 검색하세요."
              />
              {errorMessages.query?.map((message, index) => (
                <p key={index} className="text-m text-red-400">
                  {message}
                </p>
              ))}
              <button
                onClick={() => handleKeyPress()}
                className="relative ml-2 mr-4 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-xl border-4 text-white px-3 py-2 rounded"
                readOnly
              >
                검색
              </button>
            </div>
          </div>
          <div className="mb-5 overflow-hidden">
            {assignList && (
              // 테이블로 표현한 방식 (assignment와 다르게 해볼 예정)
              <>
                <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        신청자명
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        신청한 동물 번호
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        입양 희망 날짜
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
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
                          <div className="ml-4">
                            <div className="text-xl font-medium text-gray-900">
                              {assign.assignment_no}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {assign.adopter_name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {assign.animal.animal_reg_num}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {assign.animal.animal_reg_num}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {assign.status}
                              </span>
                            </div>
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
            className="pagination_notice"
          />
        </div>
      </div>
    </>

    // 원본
    // <div className="mb-20">
    //   <h2>입양신청 관리</h2>
    //   <input
    //     type="text"
    //     name="query"
    //     onChange={getQuery}
    //     onKeyPress={handleKeyPress}
    //     className="m-2 p-2 border-2 border-purple-400 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 w-1/2"
    //     placeholder="신청번호, 신청자명, 동물 등록번호, 회원 닉네임으로 검색 가능합니다."
    //   />
    //   <button onClick={() => refetch()}>검색</button>
    //   <table className="m-2">
    //     <thead>
    //       <tr>
    //         <th className="border-2 border-gray-400 p-2">신청 번호</th>
    //         <th className="border-2 border-gray-400 p-2">신청자명</th>
    //         <th className="border-2 border-gray-400 p-2">월 수입</th>
    //         <th className="border-2 border-gray-400 p-2">주거 형태</th>
    //         <th className="border-2 border-gray-400 p-2">신청한 동물 번호</th>
    //         <th className="border-2 border-gray-400 p-2">입양 희망 날짜</th>
    //         <th className="border-2 border-gray-400 p-2">상태</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {assignList?.results.map((assign) => (
    //         <tr>
    //           <td
    //             className="border-2 border-gray-400 text-center cursor-pointer p-2"
    //             onClick={() =>
    //               navigate(`/admin/assignmanage/${assign.assignment_no}/`)
    //             }
    //           >
    //             {assign.assignment_no}
    //           </td>
    //           <td
    //             className="border-2 border-gray-400 text-center cursor-pointer p-2"
    //             onClick={() =>
    //               navigate(`/admin/usermanage/${assign.user.userID}/`)
    //             }
    //           >
    //             {assign.adopter_name}
    //           </td>
    //           <td className="border-2 border-gray-400 text-center p-2">
    //             {assign.monthly_income}
    //           </td>
    //           <td className="border-2 border-gray-400 text-center p-2">
    //             {assign.residential_type === '아파트' && '아파트'}
    //             {assign.residential_type === '빌라' && '빌라'}
    //             {assign.residential_type === '주택' && '주택'}
    //             {assign.residential_type === '원룸' && '원룸'}
    //             {assign.residential_type === '오피스텔' && '오피스텔'}
    //           </td>
    //           <td
    //             className="border-2 border-gray-400 text-center cursor-pointer p-2"
    //             onClick={() =>
    //               navigate(`/admin/animal/${assign.animal.animal_no}/`)
    //             }
    //           >
    //             {assign.animal.animal_reg_num}
    //           </td>
    //           <td className="border-2 border-gray-400 text-center p-2">
    //             {assign.date_to_meet}
    //           </td>
    //           <td className="border-2 border-gray-400 text-center p-2">
    //             <h2>{assign.status}</h2>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <ReactPaginate
    //     previousLabel="<"
    //     breakLabel="..."
    //     nextLabel=">"
    //     onPageChange={handlePageClick}
    //     pageRangeDisplayed={itemsPerPage}
    //     pageCount={pageCount}
    //     renderOnZeroPageCount={null}
    //     className="pagination_notice"
    //   />
    // </div>
  );
}

export default AssignList;
