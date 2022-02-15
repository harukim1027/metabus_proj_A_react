import AnimalList from 'Components/StreetAnimal/AnimalList';
import Button from 'Button';
import { useNavigate } from 'react-router-dom';

function PageAnimalList() {
  const navigate = useNavigate();

  return (
    <div>
      <AnimalList />

      <Button onClick={() => navigate('/admin/animal/new/')}>
        새로 등록하기
      </Button>
    </div>
  );
}

export default PageAnimalList;
