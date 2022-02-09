import { useNavigate } from 'react-router-dom';
import ReviewList from 'Components/review/ReviewList';

function PageReviewList() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>포스팅 페이지</h2>
      <ReviewList />
    </div>
  );
}

export default PageReviewList;
