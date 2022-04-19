import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_assignList.css';
import '../../App.css';
import './userManage.css';

function UserAssignList({ userId }) {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [{ data: AssignStatusData, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/`,
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
        query: userId,
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
  }, [AssignStatusData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [AssignStatusData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote className="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span className="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-400 relative inline-block">
              <span className="relative text-white">" 입양신청 현황 "</span>
            </span>
          </blockquote>

          {loading && '로딩 중 ...'}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="mb-5">
            <table className="mb-5 mt-10 border text-center min-w-full divide-y divide-gray-200 whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    No
                  </th>
                  <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    동물 등록번호
                  </th>
                  <th className="px-6 py-3 text-center text-lg font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    신청날짜
                  </th>
                  <th className="px-6 py-3 text-center text-lg font-bold text-gray-500 uppercase tracking-wider w-1/4">
                    진행상태
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {AssignStatusData?.results.map((assign) => (
                  <tr
                    onClick={() =>
                      navigate(`/admin/assignmanage/${assign.assignment_no}/`)
                    }
                    className=" cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="text-base font-medium text-blue-900">
                        {assign.assignment_no}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex text-lg leading-5 font-semibold rounded-full bg-blue-100">
                        {assign.animal.animal_reg_num}
                      </div>
                    </td>

                    <td className="text-base px-6 py-4">{assign.created_at}</td>

                    <td className="text-lg px-6 py-4">{assign.status}</td>
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
            className="pagination_assignList"
          />
        </div>
      </div>
    </>
  );
}

export default UserAssignList;
