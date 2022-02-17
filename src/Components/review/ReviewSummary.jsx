import { Link } from 'react-router-dom';
import '../../App.css';
import './Review.css';

function ReviewSummary({ review }) {
  return (
    <>
      <div className="review_header">
        <Link to={`/review/${review.review_no}/`}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {review.image1 && (
              <img className="w-full" src={review.image1} alt={review.title} />
            )}
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2">{review.title}</h2>
              <h3 className="text-gray-700 text-base">
                by: {review.user.nickname}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default ReviewSummary;
