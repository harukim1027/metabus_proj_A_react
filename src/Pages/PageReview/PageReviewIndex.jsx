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
      <h2 className="mx-20">입양 후기</h2>
      <ReviewList />
      {auth.isLoggedIn && !auth.is_staff && (
        <div className="flex place-content-between">
          <div></div>
          <button
            onClick={() => navigate('/review/new/')}
            className="mx-20 text-white py-2 px-4 uppercase rounded-md bg-red-400 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            글쓰기
          </button>
        </div>
      )}
    </div>
  );
}

export default PageReviewIndex;
