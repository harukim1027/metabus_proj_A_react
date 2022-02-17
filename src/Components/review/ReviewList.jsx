import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import ReviewSummary from './ReviewSummary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFieldValues from 'hooks/useFieldValues';
import '../../App.css';
import './Review.css';

const INIT_FIELD_VALUES = { category: '' };

function ReviewList() {
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
        <div className="justify-center rounded mb-5 ">
          <div className="flex flex-wrap justify-center ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 relative mx-20">
              <div className="shadow-md py-2 align-middle inline-block min-w-full lg:px-8">
                <div className="review_header">
                  <blockquote class="mt-5 text-3xl font-semibold italic text-center text-slate-900">
                    <span class="mt-7 mb-6 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-400 relative inline-block">
                      <span class="relative text-white">" 입양 후기 "</span>
                    </span>
                  </blockquote>
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
                  <div className="flex place-content-between">
                    <div></div>
                    <div className="relative mx-10">
                      <input
                        className="appearance-none border-2 mr-3 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-pink-200 focus:border-pink-200 focus:shadow-outline"
                        type="text"
                        placeholder="검색어를 입력해주세요."
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                      />
                      <div className="absolute left-0 inset-y-0 flex items-center">
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
                        className="text-white py-2 px-4 uppercase rounded-md bg-red-400 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        onClick={() => refetch()}
                      >
                        검색
                      </button>
                    </div>
                  </div>

                  <div className="max-w-sm rounded overflow-hidden shadow-md">
                    <div className="my-5 ">
                      {reviewList && (
                        <div className="flex space-x-1">
                          {reviewList.map((review) => (
                            <div
                              key={review.review_no}
                              className="mx-20 md:w-1/4 l:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300 "
                            >
                              <ReviewSummary review={review} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReviewList;
