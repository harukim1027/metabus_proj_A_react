import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import LoadingIndicator from 'LoadingIndicator';

function AnimalDetail({ animalId }) {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [{ data: animal, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${animalId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },

    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteAnimal] =
    useApiAxios(
      {
        url: `/streetanimal/api/animal/${animalId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteAnimal().then(() => {
        navigate('/admin/animal/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="header">
        <div className="flex flex-wrap justify-center max-w-m">
          <div className="w-2/3 header justify-center px-20 pt-6 mb-3">
            <div className="animal_header rounded-xl shadow-md overflow-hidden">
              <blockquote class="mt-5 text-4xl font-semibold italic text-center text-slate-900">
                <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
                  <span class="relative text-white">" 동물 정보 "</span>
                </span>
              </blockquote>

              {loading && <LoadingIndicator />}
              {deleteLoading && (
                <LoadingIndicator>삭제 중 ...</LoadingIndicator>
              )}
              {error &&
                `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
              {deleteError &&
                `삭제 요청 중 에러가 발생했습니다. (${deleteError.response?.status} ${deleteError.response?.statusText})`}

              <div className="mb-5 overflow-hidden border-b border-gray-200">
                {animal && (
                  <>
                    <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          동물 종
                        </th>
                        <td>
                          {animal.category.name === '강아지' && '강아지'}
                          {animal.category.name === '고양이' && '고양이'}
                        </td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          등록번호
                        </th>
                        <td>{animal.animal_reg_num}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          크기
                        </th>
                        <td>
                          {animal.size === '소형' && '소형'}
                          {animal.size === '중형' && '중형'}
                          {animal.size === '대형' && '대형'}
                        </td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          성별
                        </th>
                        <td>{animal.sex === '암컷' ? '암컷' : '수컷'}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          나이
                        </th>
                        <td>{animal.age}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          발견 날짜
                        </th>
                        <td>{animal.date_of_discovery}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          발견 장소
                        </th>
                        <td>{animal.place_of_discovery}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          건강 상태
                        </th>
                        <td>{animal.physical_condition}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          보호 시작날짜
                        </th>
                        <td>{animal.start_date}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          보호 종료날짜
                        </th>
                        <td>{animal.end_date}</td>
                      </tr>

                      <tr>
                        <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider w-72">
                          입양 상태
                        </th>
                        <td>
                          {animal.protection_status === '입양 대기' &&
                            '입양 대기'}
                          {animal.protection_status === '입양 매칭 중' &&
                            '입양 매칭 중'}
                          {animal.protection_status === '입양 완료' &&
                            '입양 완료'}
                        </td>
                      </tr>
                    </table>

                    <div className="px-20">
                      {animal.image && (
                        <img
                          src={animal.image}
                          alt={animal.animal_no}
                          className="mr-1"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="my-5 text-right">
                {auth.is_staff && (
                  <>
                    <button
                      disabled={deleteLoading}
                      onClick={handleDelete}
                      className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                      삭제
                    </button>
                    <Link
                      to={`/admin/animal/${animalId}/edit/`}
                      className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                      수정
                    </Link>

                    <Link
                      to="/admin/animal/"
                      className="mr-6 ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                      목록
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimalDetail;
