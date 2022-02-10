import AnimalForm from 'Components/StreetAnimal/AnimalForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageAnimalForm() {
  const navigate = useNavigate();

  const { animalId } = useParams();

  return (
    <div>
      <AnimalForm
        animalId={animalId}
        handleDidSave={(savedPost) =>
          navigate(`/streetanimal/${savedPost.animal_no}/`)
        }
      />
    </div>
  );
}

export default PageAnimalForm;
