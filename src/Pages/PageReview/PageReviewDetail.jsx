import TopNav from 'Components/Main/TopNavi';
import ReviewDetail from 'Components/review/ReviewDetail';
import { useParams } from 'react-router-dom';

function PageReviewDetail() {
  const { reviewId } = useParams();
  return (
    <>
      <TopNav />
      <ReviewDetail reviewId={reviewId} />
    </>
  );
}
export default PageReviewDetail;
