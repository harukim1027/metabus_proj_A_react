import { useApiAxios } from 'api/base';
import { useCallback, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_animal.css';
import '../../App.css';
import './Animal.css';

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNotices(1, query);
    }
  };

  return (
    <>
      <div className="header">
        <div className="flex justify-center animal_header rounded-xl shadow-md mx-20 my-10">
          <div className="w-11/12 mb-10">
            <blockquote class="mt-5 text-4xl mb-3 font-semibold italic text-center text-slate-900">
              <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
                <span class="relative text-white">" 유기동물 관리 "</span>
              </span>
            </blockquote>

            <div className="ml-3 mb-6 mt-6">
              <div className="text-right">
                <button
                  onClick={() => navigate('/admin/animal/new/')}
                  className=" icon_size float-left ml-10"
                  readOnly
                >
                  <img src="/pen.png" alt="button"></img>
                </button>

                <input
                  type="text"
                  placeholder="등록번호로 검색하세요."
                  onChange={getQuery}
                  onKeyPress={handleKeyPress}
                  className="relative rounded p-3 text-m mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/3 px-3 md:mb-0"
                />
                <button
                  type="submit"
                  onClick={() => handleKeyPress()}
                  className="relative ml-2 mr-2 flex-shrink-0 bg-red-400 shadow-md hover:bg-red-700 border-red-400 hover:border-red-700 text-xl border-4 text-white py-1 rounded"
                >
                  검색
                </button>
              </div>
            </div>

            {loading && '로딩 중 ...'}
            {error && '로딩 중 에러가 발생했습니다.'}

            <div className="mb-5 overflow-hidden">
              <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      동물 종
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      이미지
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      등록번호
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      나이
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      성별
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
                      발견장소
                    </th>
                    <th className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider">
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.animal_no}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.category.name === '강아지' && '강아지'}
                            {animal.category.name === '고양이' && '고양이'}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={animal.image}
                            alt={animal.animal_no}
                            className="w-14 h-14"
                          />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.animal_reg_num}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.age}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.sex === '암컷' ? '암컷' : '수컷'}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.place_of_discovery}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-m font-medium text-gray-900">
                            {animal.protection_status === '입양 대기' &&
                              '입양 대기'}
                            {animal.protection_status === '입양 매칭 중' &&
                              '입양 매칭 중'}
                            {animal.protection_status === '입양 완료' &&
                              '입양 완료'}
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
      </div>
    </>
  );
}

export default AnimalList;
