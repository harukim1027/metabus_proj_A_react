import ReviewDetail from 'Components/review/ReviewDetail';
import { useParams } from 'react-router-dom';

function PageReviewDetail() {
  const { reviewId } = useParams();
  return (
    <div>
      <ReviewDetail reviewId={reviewId} />
    </div>
  );
}
export default PageReviewDetail;
