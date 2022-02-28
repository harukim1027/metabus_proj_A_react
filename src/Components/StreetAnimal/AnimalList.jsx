import { useApiAxios } from 'api/base';
import { useCallback, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_animal.css';
import '../../App.css';
import './Animal.css';
import LoadingIndicator from 'LoadingIndicator';

function AnimalList() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const [{ data: AnimalList, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const fetchAnimal = useCallback(
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
    fetchAnimal(1);
  }, []);

  const handlePageClick = (event) => {
    fetchAnimal(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleBTNPress = () => {
    fetchAnimal(1, query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchAnimal(1, query);
    }
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [AnimalList]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [AnimalList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
              <span class="relative text-white">" 유기동물 관리 "</span>
            </span>
          </blockquote>

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

          <div className="ml-3 mb-6 mt-3">
            <div className="text-right">
              <button
                onClick={() => navigate('/admin/animal/new/')}
                className=" icon_size float-left ml-10 hover:scale-110"
                readOnly
              >
                <img src="/pen.png" alt="button"></img>
              </button>

              <input
                type="text"
                placeholder="등록번호로 검색하세요."
                onChange={getQuery}
                onKeyPress={handleKeyPress}
                className="relative rounded p-3 text-base mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/3 px-3 md:mb-0"
              />
              <button
                onClick={handleBTNPress}
                className="relative ml-2 mr-4 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-xl border-4 text-white px-3 py-2 rounded"
                readOnly
              >
                검색
              </button>
            </div>
          </div>

          <div className="mb-5 overflow-hidden">
            <table className="border text-center min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-44"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-44"
                  >
                    동물 종
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-1/2"
                  >
                    등록번호
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-44"
                  >
                    입양 상태
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {AnimalList &&
                  AnimalList.results.map((animal) => (
                    <tr
                      onClick={() =>
                        navigate(`/admin/animal/${animal.animal_no}/`)
                      }
                      className="cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="text-base font-medium text-gray-900">
                          {animal.animal_no}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-base font-medium text-gray-900">
                          {animal.category.name}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xl text-gray-900 font-semibold rounded-full bg-red-100">
                          {animal.animal_reg_num}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {animal.protection_status}
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
            className="pagination_animal"
          />
        </div>
      </div>
    </>
  );
}

export default AnimalList;
