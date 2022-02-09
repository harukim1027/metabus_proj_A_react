import { useNavigate } from 'react-router-dom';
import ReviewList from 'Components/review/ReviewList';
import TopNav from 'Components/Main/TopNavi';

function PageReviewIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <TopNav />
      <h2>포스팅 페이지</h2>
      <ReviewList />
    </div>
  );
}

export default PageReviewIndex;
