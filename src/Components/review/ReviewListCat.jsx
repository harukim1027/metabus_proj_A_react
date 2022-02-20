import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import ReviewSummary from './ReviewSummary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import '../../App.css';
import './Review.css';

const INIT_FIELD_VALUES = { category: '' };

function ReviewList() {
  const { auth } = useAuth();
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const [{ data: reviewList }, refetch] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${query ? '?query=' + query : ''}`,
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

  return (
    <>
      <div className="header">
        <div className="flex flex-wrap justify-center  overflow-x-auto  relative mx-20">
          <div className="ml-3 py-2 align-middle inline-block ">
            <div className="review_header shadow-md mb-10 rounded-2xl pb-5">
              <blockquote class="mt-6 text-6xl font-semibold italic text-center text-slate-900">
                <span class="mt-10 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block">
                  <span class="relative text-white">" 입양 후기 "</span>
                </span>
              </blockquote>
              <hr />
              <div className="ml-10 mb-3 mt-3">
                <form onSubmit={() => moveCategory()}>
                  <select
                    name="category"
                    value={fieldValues.category}
                    onChange={handleFieldChange}
                    className="border-2 border-sky-400 rounded p-2"
                    defaultValue="카테고리"
                  >
                    <option value="카테고리">카테고리</option>
                    <option value="전체">전체</option>
                    <option value="강아지">강아지</option>
                    <option value="고양이">고양이</option>
                  </select>
                </form>
              </div>

              {/* 검색 필드 + CSS */}
              <div className="">
                {/*  */}
                <div className="flex place-content-between">
                  <div className="relative mx-10 flex-1 mb-5">
                    <input
                      className="appearance-none border-2 mr-3 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-pink-200 focus:border-pink-200 focus:shadow-outline"
                      type="text"
                      placeholder="검색어를 입력해주세요."
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="absolute left-0 top-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <button
                      type="submit"
                      className="relative top-0 text-white py-2 px-4 uppercase rounded-md bg-red-400 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      onClick={() => refetch()}
                    >
                      검색
                    </button>
                  </div>
                  <div>
                    {auth.isLoggedIn && !auth.is_staff && (
                      <button
                        onClick={() => navigate('/review/new/')}
                        className="icon_size2"
                        readOnly
                      >
                        <img
                          className="transition transform hover:-translate-y-1"
                          src="/pen2.png"
                          alt="button"
                        ></img>
                      </button>
                    )}
                  </div>
                </div>
                <hr className="mb-3 mt-3" />
              </div>

              <div className="flex flex-wrap justify-center rounded">
                {reviewList &&
                  reviewList
                    .filter(
                      (a) => a.adoptassignment.animal.category === '고양이',
                    )
                    .map((review) => (
                      <div
                        key={review.review_no}
                        className="transition-transform hover:-translate-y-5 duration-300 my-5 rounded-xl mx-5 mb-3 lg:w-1/4 sm:w-1/3 overflow-hidden shadow-lg inline"
                      >
                        <ReviewSummary review={review} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        {auth.isLoggedIn && !auth.is_staff && (
          <div className="flex place-content-between">
            <div></div>
            <button
              onClick={() => navigate('/review/new/')}
              className="mx-20 text-white py-2 px-4 uppercase rounded-md bg-red-400 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              글쓰기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default ReviewList;
