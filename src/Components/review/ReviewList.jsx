import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import ReviewSummary from './ReviewSummary';
import { useState } from 'react';

function ReviewList() {
  const [query, setQuery] = useState('');
  const [{ data: reviewList }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
      console.log('ENTER');
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button type="submit" onClick={() => refetch()}>
        검색
      </button>
      <div className="my-5 ">
        {reviewList && (
          <div className="flex space-x-1">
            {reviewList.map((review) => (
              <div
                key={review.review_no}
                className="w-full md:w-1/4 l:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300 "
              >
                <ReviewSummary review={review} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default ReviewList;
