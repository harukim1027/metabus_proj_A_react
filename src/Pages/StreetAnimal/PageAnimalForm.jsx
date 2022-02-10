import AnimalForm from 'Components/StreetAnimal/AnimalForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageAnimalForm() {
  const navigate = useNavigate();

  const { animal_no } = useParams();

  return (
    <div>
      <AnimalForm
        animal_no={animal_no}
        handleDidSave={(savedPost) =>
          navigate(`/streetanimal/${savedPost.animal_no}/`)
        }
      />
    </div>
  );
}

export default PageAnimalForm;
