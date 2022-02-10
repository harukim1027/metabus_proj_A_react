import { useApiAxios } from 'api/base';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';

function ReviewDetail({ reviewId }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [{ data: review, loading, error }, refetch] = useApiAxios(
    `/adopt_review/api/reviews/${reviewId}/`,
    { manual: true },
  );

  const [{}, deleteReview] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteReview().then(() => {
        navigate('/review/');
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <TopNav />
      {review && (
        <>
          <h1>{review.title}</h1>
          {review.image1 && <img src={review.image1} alt={review.image1} />}
          {review.image2 && <img src={review.image2} alt={review.image2} />}
          {review.image3 && <img src={review.image3} alt={review.image3} />}
          {review.image4 && <img src={review.image4} alt={review.image4} />}
          {review.image5 && <img src={review.image5} alt={review.image5} />}
          <h2>{review.content}</h2>
        </>
      )}
      <Link to="/review/">목록으로</Link>
      <Link to={`/review/${reviewId}/edit/`}>수정하기</Link>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
}

export default ReviewDetail;
