import AnimalDetail from 'Components/StreetAnimal/AnimalDetail';
import { useParams } from 'react-router-dom';

function PageAnimalDetail() {
  const { animalId } = useParams();

  return (
    <div>
      <AnimalDetail animalId={animalId} />
    </div>
  );
}

export default PageAnimalDetail;
