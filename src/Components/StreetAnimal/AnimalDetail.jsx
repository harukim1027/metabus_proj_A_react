import TopNav from 'Components/Main/TopNavi';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';

function AnimalDetail({ animalId }) {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [{ data: animal }, refetch] = useApiAxios(
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
    if (window.confirm('Are you sure?')) {
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
          <p>{animal.size}</p>
          <p>{animal.sex}</p>
          <p>{animal.age}</p>
          <p>{animal.date_of_discovery}</p>
          <p>{animal.place_of_discovery}</p>
          <p>{animal.physical_condition}</p>
          <p>{animal.start_date}</p>
          <p>{animal.end_date}</p>
          <p>{animal.protection_status}</p>
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
