import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  return (
    <div>
      <Link to={`/review/${review.review_no}/`}>
        {review.image1 && <img src={review.image1} alt={review.title} />}
        <div>
          <h3>
            <Link to={`/review/${review.review_no}/`}>{review.title}</Link>
          </h3>
        </div>
      </Link>
    </div>
  );
}
export default ReviewSummary;
