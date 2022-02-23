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
  const { auth } = useAuth();
  const [image1, setImage1] = useState('');
  const [filtAssign, setFiltAssign] = useState([]);

  const [{ data: review, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'GET',
    },
    {
      manual: !reviewId,
    },
  );

  const [selectanimalAssign, setSelectanimalAssign] = useState(
    review?.adoptassignment.assignment_no,
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

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
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

  // fieldValues.animal = selAnimalInfo;
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
        draft.adoptassignment = selectanimalAssign;
      }),
    );
  }, [auth.userID, setFieldValues, selectanimalAssign]);

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

  // 사진 등록시
  const imgpreview1 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage1(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  console.log('fieldValues', fieldValues);
  console.log('selectanimalAssign: ', selectanimalAssign);
  // console.log('AnimalList', AnimalList);

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
          <div className="review_header rounded-2xl w-11/12">
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
                    assignmentList.results?.filter(
                      (assignment) =>
                        assignment.status === '입양 완료' &&
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
                  <div>
                    {filtAssign.map((ani) => (
                      <div
                        className="inline-block p-2 m-2 rounded border-2 border-pink-200 w-1/5 cursor-pointer hover:scale-110"
                        onClick={() => setSelectanimalAssign(ani.assignment_no)}
                      >
                        <div className="flex h-36 items-center">
                          <img src={ani.animal.image} alt="" />
                        </div>
                        <h2>나이 : {ani.animal.age} 세</h2>
                        <h3>{ani.animal.animal_reg_num}</h3>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-center my-10">
              <div className="bg-white rounded-xl shadow-md px-20 py-8 w-11/12">
                <p className="text-center text-blue-900 font-bold text-xl mb-5">
                  ⬇ 선택하신 동물 정보가 표시됩니다. ⬇
                </p>
                {filtAssign
                  ?.filter((filt) => filt.assignment_no === selectanimalAssign)
                  .map((a) => (
                    <div className="flex flex-wrap justify-center">
                      <div className="flex-none place-items-center">
                        <img src={a.animal.image} alt="" className="w-72" />
                      </div>
                      <div className="flex-none mx-4 justify-items-center">
                        <div className="flex justify-center">
                          <ul className="w-72">
                            <li className="flex justify-between mt-2">
                              <span className="bg-blue-100 font-bold">
                                품종
                              </span>
                              <span>{a.animal.category.name}</span>
                            </li>
                            <li className="flex justify-between mt-2">
                              <span className="bg-blue-100 font-bold">
                                사이즈
                              </span>
                              <span>{a.animal.size}</span>
                            </li>
                            <li className="flex justify-between mt-2">
                              <span className="bg-blue-100 font-bold">
                                성별
                              </span>
                              <span>{a.animal.sex}</span>
                            </li>
                            <li className="flex justify-between mt-2">
                              <span className="bg-blue-100 font-bold">
                                나이
                              </span>
                              <span>{a.animal.age}</span>
                            </li>
                            <li className="flex items-center justify-between mt-2">
                              <span className="bg-blue-100 font-bold">
                                등록번호
                              </span>
                              <span>{a.animal.animal_reg_num}</span>
                            </li>
                            <li className="flex items-center justify-between mt-2">
                              <span className="bg-blue-100 font-bold">
                                발견 장소
                              </span>
                              <span>{a.animal.place_of_discovery}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* 수정 진입시 바로 뜨는 부분 */}
                {/* <div className="flex justify-center">
                  <ul className="w-72">
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">품종</span>
                      <span>
                        {review?.adoptassignment.animal.category.name}
                      </span>
                    </li>
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">사이즈</span>
                      <span>{review?.adoptassignment.animal.size}</span>
                    </li>
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">성별</span>
                      <span>{review?.adoptassignment.animal.sex}</span>
                    </li>
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">나이</span>
                      <span>{review?.adoptassignment.animal.age}</span>
                    </li>
                    <li className="flex items-center justify-between mt-2">
                      <span className="bg-blue-100 font-bold">등록번호</span>
                      <span>
                        {review?.adoptassignment.animal.animal_reg_num}
                      </span>
                    </li>
                    <li className="flex items-center justify-between mt-2">
                      <span className="bg-blue-100 font-bold">발견 장소</span>
                      <span>
                        {review?.adoptassignment.animal.place_of_discovery}
                      </span>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="notice_header rounded-xl px-10 pt-6 pb-8"
          >
            {/* 제목 입력 input 박스 */}
            <div className="flex flex-wrap justify-center max-w-m">
              <form onSubmit={handleSubmit}>
                <div className="ml-3 mb-3 w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                    제목
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={fieldValues.title}
                    onChange={handleFieldChange}
                    placeholder="제목을 입력해주세요."
                    className="rounded-xl text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 "
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center -ml-2 mt-8">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-300"></span>
                    </span>
                  </div>
                  <br />
                </div>

                {/* 내용 입력 input 박스 */}
                <div className="ml-3 mb-3 w-full ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                    내용
                  </span>

                  <textarea
                    type="text"
                    name="content"
                    value={fieldValues.content}
                    onChange={handleFieldChange}
                    placeholder="내용을 입력해주세요."
                    className="rounded-xl text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 h-60"
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center -ml-2 mt-8">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-300"></span>
                    </span>
                  </div>
                </div>

                {/* 이미지 첨부 인풋박스 */}
                <div className="mt-3 ml-3 mb-3 w-full">
                  <span className=" block uppercase tracking-wide text-blue-900 text-m font-bold mb-2 ">
                    이미지 첨부
                  </span>
                  <h2 className="text-gray-500 text-xs">
                    ( 최대 5개까지 이미지를 등록할 수 있습니다. )
                  </h2>

                  <div className="bg-white px-4 py-5 w-full">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="flex justify-between items-center text-sm pl-3 pr-4 py-3 w-2/3 border-2 rounded-md">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image1"
                          onChange={(e) => {
                            imgpreview1(e, e.target.files[0]);
                          }}
                        />
                        {!fieldValues.image1 && (
                          <div>
                            <img src={review?.image1} alt="" className="h-44" />
                          </div>
                        )}

                        <div>
                          <img src={image1} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage1('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                image1: '',
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.image1?.map((message, index) => (
                        <p key={index} className="text-xs text-red-400">
                          {message}
                        </p>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="my-3 mx-20">
                  {/* <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image1"
                    onChange={handleFieldChange}
                  /> */}
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

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    onClick={(e) => handleSubmit(e)}
                    onSubmit={handleSubmit}
                  >
                    저장하기
                  </button>
                </div>
              </form>
            </div>
          </form>
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
