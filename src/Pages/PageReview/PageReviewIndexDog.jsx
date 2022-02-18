import { useNavigate } from 'react-router-dom';
import ReviewListDog from 'Components/review/ReviewListDog';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';
import { useApiAxios } from 'api/base';

function PageReviewIndexDog() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <TopNav />

      <ReviewListDog />
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

export default PageReviewIndexDog;
