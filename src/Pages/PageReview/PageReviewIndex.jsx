import { useNavigate } from 'react-router-dom';
import ReviewList from 'Components/review/ReviewList';
import TopNav from 'Components/Main/TopNavi';

function PageReviewIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <TopNav />
      <h2>리뷰 페이지</h2>
      <ReviewList />
      <button onClick={() => navigate('/review/new/')}>글쓰기</button>
    </div>
  );
}

export default PageReviewIndex;
