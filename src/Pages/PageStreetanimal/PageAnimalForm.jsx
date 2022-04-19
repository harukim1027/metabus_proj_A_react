import TopNav from 'Components/Main/TopNavi';
import AnimalForm from 'Components/StreetAnimal/AnimalForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageAnimalForm() {
  const navigate = useNavigate();

  const { animalId } = useParams();

  return (
    <div>
      <TopNav />
      <AnimalForm
        animalId={animalId}
        handleDidSave={(savedPost) =>
          navigate(`/admin/animal/${savedPost.animal_no}/`)
        }
      />
    </div>
  );
}

export default PageAnimalForm;
