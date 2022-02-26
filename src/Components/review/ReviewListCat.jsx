import { useApiAxios } from 'api/base';
import { useState, useEffect, useCallback } from 'react';
import ReviewSummary from './ReviewSummary';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import 'css/pagination_review.css';
import LoadingIndicator from 'LoadingIndicator';

const INIT_FIELD_VALUES = { category: '고양이' };

function ReviewList() {
  const { auth } = useAuth();
  const [query, setQuery] = useState('');
  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const navigate = useNavigate();
  const [{ data: reviewList, loading, error }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
      fetchReviews(1, query);

      console.log('ENTER');
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const moveCategory = () => {
    fieldValues.category === '전체' && navigate(`/review/`);
    fieldValues.category === '강아지' && navigate(`/review/dog/`);
    fieldValues.category === '고양이' && navigate(`/review/cat/`);
  };

  useEffect(() => {
    moveCategory();
  }, [fieldValues]);

  const fetchReviews = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchReviews(1);
  }, []);

  const handlePageClick = (event) => {
    fetchReviews(event.selected + 1);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  // 스크롤 기능
  const [scrollY, setScrollY] = useState(0);
  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 1016,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
  };

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });
  // console.log('window Scroll From Top:', scrollY);

  useEffect(() => {
    gotoTop();
  }, [reviewList]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3  xl:w-2/3 lg:w-2/3 md:w-3/4 sm:w-w-full xs:w-full">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block xs:text-2xl sm:text-4xl md:text-6xl">
              <span class="relative text-white">" 입양 후기 "</span>
            </span>
          </blockquote>

          {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
          {error && '로딩 중 에러가 발생했습니다.'}

          <div className="ml-3 mb-6 mt-3">
            <form onSubmit={() => moveCategory()}>
              <select
                name="category"
                value={fieldValues.category}
                onChange={handleFieldChange}
                className="text-xl border-2 border-purple-400 rounded p-2"
                defaultValue="고양이"
              >
                <option value="전체">전체</option>
                <option value="강아지">강아지</option>
                <option value="고양이">고양이</option>
              </select>
            </form>
          </div>

          {/* 검색 필드 + CSS */}
          <div className="ml-3 mb-6 mt-3">
            <div className="text-right">
              {auth.isLoggedIn && !auth.is_staff && (
                <button
                  onClick={() => navigate('/review/new/')}
                  className=" icon_size float-left ml-10 hover:scale-110"
                  readOnly
                >
                  <img src="/pen.png" alt="button"></img>
                </button>
              )}
              <input
                type="text"
                name="query"
                onChange={getQuery}
                onKeyPress={handleKeyPress}
                className="relative rounded p-3 text-m mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/3 px-3 md:mb-0"
                placeholder="제목을 검색하세요."
              />
              <button
                onClick={() => handleKeyPress()}
                className="relative ml-2 mr-4 flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-xl border-4 text-white px-3 py-2 rounded"
                readOnly
              >
                검색
              </button>
            </div>
          </div>

          <hr className="mb-3 mt-3" />

          <div className="flex flex-wrap justify-center rounded mb-20">
            {reviewList?.results
              ?.filter((a) => a.adoptassignment.animal.category === '고양이')
              .map((review) => (
                <div
                  key={review.review_no}
                  className="transition-transform hover:-translate-y-5 duration-300 my-5 rounded-xl mx-5 mb-3 w-44 h-60 overflow-hidden shadow-lg inline"
                >
                  <ReviewSummary review={review} />
                </div>
              ))}
          </div>
          <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="pagination_review"
          />
        </div>
      </div>
    </>
  );
}
export default ReviewList;
