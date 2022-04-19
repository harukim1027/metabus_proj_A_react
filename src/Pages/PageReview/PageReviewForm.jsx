import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from 'Components/review/ReviewForm';
import TopNav from 'Components/Main/TopNavi';
import { useApiAxios } from 'api/base';

function PageReviewForm() {
  const navigate = useNavigate();

  const { reviewId } = useParams();

  const [{ data: review, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'GET',
    },
    {
      manual: !reviewId,
    },
  );

  return (
    <>
      <TopNav />
      <ReviewForm
        review={review}
        reviewId={reviewId}
        handleDidSave={(savedPost) =>
          navigate(`/review/${savedPost.review_no}/`)
        }
      />
    </>
  );
}
export default PageReviewForm;
