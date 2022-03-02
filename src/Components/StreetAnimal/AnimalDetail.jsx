import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
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

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [animal]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [animal]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
              <span class="relative text-white">" 동물 정보 "</span>
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
          <div className="my-5 overflow-hidden">
            {animal && (
              <>
                <div className="flex justify-center">
                  {animal.image && (
                    <img
                      src={animal.image}
                      alt="동물 이미지가 없습니다."
                      className="h-96"
                    />
                  )}
                </div>
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
                      동물 정보
                    </th>
                    <td>{animal.info}</td>
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
                    <td>{animal.protection_status}</td>
                  </tr>
                </table>
              </>
            )}
          </div>

          <div className="my-5 text-right">
            {auth.is_staff && (
              <>
                <button
                  disabled={deleteLoading}
                  onClick={handleDelete}
                  className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  삭제
                </button>
                <Link
                  to={`/admin/animal/${animalId}/edit/`}
                  className="ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  수정
                </Link>

                <Link
                  to="/admin/animal/"
                  className="mr-6 ml-3 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  목록
                </Link>

                <div>
                  {deleteLoading && (
                    <LoadingIndicator>&nbsp;&nbsp;삭제 중 ...</LoadingIndicator>
                  )}
                  {deleteError && `삭제 요청 중 에러가 발생했습니다.`}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimalDetail;
