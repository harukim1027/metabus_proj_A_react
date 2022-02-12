import { useNavigate } from 'react-router-dom';
import ReviewList from 'Components/review/ReviewList';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';
import { useApiAxios } from 'api/base';

function PageReviewIndex() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  return (
    <div>
      <TopNav />
      <h2>리뷰 페이지</h2>
      <ReviewList />
      {auth.isLoggedIn && !auth.is_staff && (
        <button onClick={() => navigate('/review/new/')}>글쓰기</button>
      )}
    </div>
  );
}

export default PageReviewIndex;
