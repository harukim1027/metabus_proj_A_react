import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';
import produce from 'immer';

import './Review.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function ReviewForm({ reviewId, handleDidSave }) {
  const [filtAssign, setFiltAssign] = useState([]);
  const [selectanimal, setSelectanimal] = useState(null);
  const { auth } = useAuth();

  const [{ data: review, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'GET',
    },
    {
      manual: !reviewId,
    },
  );

  const [{ data: assignmentList, loading, error }] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/`,
      method: 'GET',
      data: { user: auth.userID },
    },
    {
      manual: false,
    },
  );

  const [{ loading: saveLoading, error: saveError }, saveRequest] = useApiAxios(
    {
      url: !reviewId
        ? '/adopt_review/api/reviews/'
        : `/adopt_review/api/reviews/${reviewId}/`,
      method: !reviewId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    review || INIT_FIELD_VALUES,
  );

  // fieldValues.adoptassignment = filtAnimal;

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.image1 = '';
        draft.image2 = '';
        draft.image3 = '';
        draft.image4 = '';
        draft.image5 = '';
        draft.user = auth.userID;
        draft.adoptassignment = selectanimal;
      }),
    );
  }, [auth.userID, setFieldValues, selectanimal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  console.log('filtAssign', filtAssign);
  // console.log('fieldValues', fieldValues);
  // console.log('setSelectanimal', setSelectanimal);

  return (
    <>
      {saveLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}

      {/* 전체 감싸는 header : 배경 색 */}
      <div className="header ">
        {/* 영역을 나누어지주는 flex */}
        <div className="flex flex-wrap justify-center max-w-m ">
          {/* 페이지 이름 */}

          {/* review_header : 배경 흰색 */}
          <div className="review_header rounded-2xl">
            <blockquote class="mt-3 mb-10 text-2xl font-semibold italic text-center text-slate-900">
              <span class="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-400 relative inline-block text-3xl font-extrabold">
                <span class="relative text-white">" 누구를 입양했나요 ? "</span>
              </span>
            </blockquote>
            <hr />

            {/* 리뷰할 크루 선택 버튼 */}
            <div className="flex flex-wrap justify-center max-w-m">
              <button
                onClick={() =>
                  assignmentList &&
                  setFiltAssign(
                    assignmentList.filter(
                      (assignment) =>
                        assignment.status === '신청' &&
                        assignment.user.userID === auth.userID,
                    ),
                  )
                }
                className="bg-pink-100 p-2 m-2 rounded-lg"
              >
                리뷰할 크루 선택하기
              </button>
            </div>

            {/* 선택 후 나오는 정보 박스 */}
            <div>
              {filtAssign && (
                <>
                  {filtAssign.map((ani) => (
                    <div
                      className="inline-block p-2 m-2 rounded border-2 border-pink-200 w-1/5 cursor-pointer hover:scale-110"
                      onClick={() => setSelectanimal(ani.assignment_no)}
                    >
                      <div className="flex h-36 items-center">
                        <img src={ani.animal.image} alt="" />
                      </div>
                      <h2>나이 : {ani.animal.age} 세</h2>
                      <h3>{ani.animal.animal_reg_num}</h3>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* 제목 입력 input 박스 */}
          <div className="flex flex-wrap justify-center max-w-m">
            <form onSubmit={handleSubmit}>
              <div className="ml-3 -mx-3 mb-6">
                <div className="ml-3 mb-3 w-full">
                  <label className="p-2 w-1/2 text-gray-800 relative mx-20 focus-within:text-pink-300 bg-white transition-colors rounded-md block border-2 border-gray-200 focus-within:border-pink-300">
                    <input
                      type="text"
                      name="title"
                      value={fieldValues.title}
                      onChange={handleFieldChange}
                      placeholder="제목을 입력해주세요."
                      className="rounded p-3 text-sm   focus:outline-none focus:border focus:border-gray-400  w-full px-3 mb-6"
                    />
                    <div className="absolute left-0 inset-y-0 flex items-center -ml-2 mt-8">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-300"></span>
                      </span>
                    </div>
                  </label>
                  <br />
                </div>
              </div>

              {/* 내용 입력 input 박스 */}
              <div className="ml-3 -mx-3 mb-6">
                <div className="ml-3 mb-3 w-full ">
                  <span className="p-10 w-1/2 text-gray-800 relative mx-20 focus-within:text-pink-300 bg-white transition-colors rounded-md block border-2 border-gray-200 focus-within:border-pink-300">
                    {' '}
                    내용{' '}
                  </span>

                  <input
                    type="text"
                    name="content"
                    value={fieldValues.content}
                    onChange={handleFieldChange}
                    placeholder="내용을 입력해주세요."
                    className="rounded p-3 text-sm   focus:outline-none focus:border focus:border-gray-400  w-full px-3 mb-6"
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center -ml-2 mt-8">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-300"></span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-3 mx-20">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image1"
                  onChange={handleFieldChange}
                />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image2"
                  onChange={handleFieldChange}
                />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image3"
                  onChange={handleFieldChange}
                />
                <br />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image4"
                  onChange={handleFieldChange}
                />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image5"
                  onChange={handleFieldChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-pink-100 mx-20 p-2 m-2 rounded-lg"
                  onClick={(e) => handleSubmit(e)}
                  onSubmit={handleSubmit}
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DebugStates
        review={review}
        getLoading={getLoading}
        getError={getError}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default ReviewForm;
