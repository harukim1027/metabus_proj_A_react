import { Link } from 'react-router-dom';

function ReviewSummary({ review }) {
  return (
    <Link to={`/review/${review.review_no}/`}>
      <div>
        {review.image1 && <img src={review.image1} alt={review.title} />}
        <div>
          <h2>{review.title}</h2>
          <h3>by: {review.user}</h3>
        </div>
      </div>
    </Link>
  );
}
export default ReviewSummary;
