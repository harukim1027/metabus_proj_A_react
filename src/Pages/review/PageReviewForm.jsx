import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from 'Components/review/ReviewForm';
import TopNav from 'Components/Main/TopNavi';

function PageReviewForm() {
  const navigate = useNavigate();

  const { reviewId } = useParams();

  return (
    <>
      <TopNav />
      <ReviewForm
        reviewId={reviewId}
        handleDidSave={(savedPost) => navigate(`/review/${savedPost.id}/`)}
      />
    </>
  );
}
export default PageReviewForm;
