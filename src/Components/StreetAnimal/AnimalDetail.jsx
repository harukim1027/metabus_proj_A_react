import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function AnimalDetail() {
  const { postId } = useParams();

  return (
    <div>
      <TopNav />
      <h2>AnimalDetail</h2>
    </div>
  );
}

export default AnimalDetail;
