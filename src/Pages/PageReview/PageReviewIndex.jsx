import { useNavigate } from 'react-router-dom';
import ReviewList from 'Components/review/ReviewList';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';

function PageReviewIndex() {
  return (
    <div>
      <TopNav />

      <ReviewList />
    </div>
  );
}

export default PageReviewIndex;
