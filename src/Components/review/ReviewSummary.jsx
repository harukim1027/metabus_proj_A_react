import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  return (
    <Link to={`/review/${review.review_no}/`}>
      <div>
        {review.image1 && <img src={review.image1} alt={review.title} />}
        <div>
          <h3>
            {review.title} by: {review.user}
          </h3>
        </div>
      </div>
    </Link>
  );
}
export default ReviewSummary;
