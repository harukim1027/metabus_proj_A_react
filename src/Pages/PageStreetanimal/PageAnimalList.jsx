import AnimalList from 'Components/StreetAnimal/AnimalList';
import Button from 'Button';
import { useNavigate } from 'react-router-dom';
import TopNav from 'Components/Main/TopNavi';

function PageAnimalList() {
  const navigate = useNavigate();

  return (
    <div>
      <TopNav />
      <AnimalList />
      <Button onClick={() => navigate('/admin/animal/new/')}>
        새로 등록하기
      </Button>
    </div>
  );
}

export default PageAnimalList;
