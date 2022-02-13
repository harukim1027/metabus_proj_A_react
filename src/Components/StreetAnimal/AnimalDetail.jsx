import TopNav from 'Components/Main/TopNavi';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import DebugStates from 'DebugStates';

function AnimalDetail({ animalId }) {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [{ data: animal }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${animalId}/`,
      method: 'GET',
      // headers: {
      //   Authorization: `Bearer ${auth.access}`,
      // },
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
        navigate('/streetanimal/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <TopNav />
      <h2>AnimalDetail</h2>

      {animal && (
        <>
          <div className="my-3">
            <span>지역번호</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.animal_reg_num}
            </span>
          </div>

          <div className="my-3">
            <span>크기</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.size === '1' ? '소형' : '2' ? '중형' : '3' ? '대형' : ''}
            </span>
          </div>

          <div className="my-3">
            <span>성별</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.sex === '1' ? '암컷' : '수컷'}
            </span>
          </div>

          <div className="my-3">
            <span>나이</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.age}세
            </span>
          </div>

          <div className="my-3">
            <span>발견 날짜</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.date_of_discovery}
            </span>
          </div>

          <div className="my-3">
            <span>발견 장소</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.place_of_discovery}
            </span>
          </div>

          <div className="my-3">
            <span>건강 상태</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.physical_condition}
            </span>
          </div>

          <div className="my-3">
            <span>보호 시작날짜</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.start_date}
            </span>
          </div>

          <div className="my-3">
            <span>보호 종료날짜</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.end_date}
            </span>
          </div>

          <div className="my-3">
            <span>입양 상태</span>
            <span className="border-2 border-sky-400 rounded p-1 ml-2">
              {animal.protection_status === '1'
                ? '입양 대기'
                : '2'
                ? '입양 매칭 중'
                : '3'
                ? '입양 완료'
                : ''}
            </span>
          </div>

          {animal.image && <img src={animal.image} alt={animal.animal_no} />}
        </>
      )}

      <div>
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="hover:text-red-400"
        >
          삭제
        </button>
        <Link
          to={`/streetanimal/${animalId}/edit/`}
          className="hover:text-red-400"
        >
          수정
        </Link>
        <Link to="/streetanimal/" className="hover:text-red-400">
          목록
        </Link>
      </div>
    </div>
  );
}

export default AnimalDetail;
