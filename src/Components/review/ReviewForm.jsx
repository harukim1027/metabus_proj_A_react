import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';
import produce from 'immer';

import './Review.css';
import '../../App.css';
import LoadingIndicator from 'LoadingIndicator';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function ReviewForm({ reviewId, handleDidSave }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [filtAssign, setFiltAssign] = useState([]);
  const [clicked, setClicked] = useState(0);

  const [{ data: review, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'GET',
    },
    {
      manual: !reviewId,
    },
  );
  // console.log('review: ', review);

  const [selectanimalAssign, setSelectanimalAssign] = useState(
    review?.adoptassignment.assignment_no,
  );

  const [{ data: assignmentList, loading, error }] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignmentnotpaging/`,
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

  // 사진 등록시
  const imgpreview2 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage2(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };
  // 사진 등록시
  const imgpreview3 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage3(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };
  // 사진 등록시
  const imgpreview4 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage4(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };
  // 사진 등록시
  const imgpreview5 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage5(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  // console.log('fieldValues', fieldValues);
  // console.log('selectanimalAssign: ', selectanimalAssign);
  // console.log('AnimalList', AnimalList);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [review]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  const [formLoc, setFormLoc] = useState(0);
  // console.log('formLoc: ', formLoc);
  useEffect(() => {
    setFormLoc(document.querySelector('#form').offsetTop);
  }, [selectanimalAssign]);

  const gotoForm = () => {
    window.scrollTo({
      top: formLoc,
      behavior: 'smooth',
    });
  };

  // const handleFollow = () => {
  //   setScrollY(window.pageYOffset);
  // };

  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //-------------

  return (
    <>
      {/* review_header : 배경 흰색 */}
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="review_header rounded-xl shadow-md overflow-hidden md:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote className="mt-10 mb-6 text-2xl font-semibold italic text-center text-slate-900">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-500 relative inline-block xs:text-2xl sm:text-4xl md:text-6xl text-6xl font-extrabold">
              <span class="relative text-white">
                {!reviewId ? ' " 입양 후기 작성 " ' : ' " 입양 후기 수정 " '}
              </span>
            </span>
          </blockquote>

          {/* 로딩 에러 */}
          {loading && (
            <LoadingIndicator>&nbsp;&nbsp;로딩 중...</LoadingIndicator>
          )}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          <br />

          {/*  */}

          <span className="mb-6 block tracking-wide text-gray-700 text-4xl font-bold text-center">
            🐶 크루원 선택 하기 🐱
          </span>
          <hr className="mb-3 mt-3" readOnly />

          <div className="ml-3 mt-3">
            <div className="w-full px-3 mb-10">
              {/* 버튼 클릭 부분 */}
              <div className="mt-5">
                {/* 리뷰할 크루 선택 버튼 */}
                <div className="flex flex-wrap justify-center max-w-m">
                  <button
                    onClick={() =>
                      assignmentList &&
                      setFiltAssign(
                        assignmentList?.filter(
                          (assignment) =>
                            assignment.status === '입양 완료' &&
                            assignment.user.userID === auth.userID,
                        ),
                      )
                    }
                    className="bg-purple-200 p-2 m-2 rounded-lg"
                  >
                    리뷰할 크루 선택하기
                  </button>
                </div>

                {/* 검색한 동물 보여주기 */}
                {/* 필터가 됐을 시에 노출 문구  */}
                {filtAssign.length !== 0 ? (
                  <p className="text-center text-blue-900 font-bold text-xl mb-5 xs:text-lg">
                    ⬇ 원하시는 크루원을 아래에서 선택해주세요. ⬇
                  </p>
                ) : (
                  ''
                )}

                {/* 선택 후 나오는 정보 박스 */}
                <div className="flex flex-wrap justify-center">
                  {filtAssign && (
                    <>
                      <div>
                        {filtAssign.map((ani) => (
                          <div
                            className="inline-block assign_table rounded-md shadow-md cursor-pointer hover:scale-110 overflow-hidden mx-4 my-4 w-96"
                            onClick={() => {
                              setSelectanimalAssign(ani.assignment_no);
                              gotoForm();
                              setClicked(1);
                            }}
                          >
                            <div className="flex justify-center overflow-hidden">
                              <img
                                src={ani.animal.image}
                                alt="이미지"
                                className="assign_photo object-cover"
                              />

                              <div className="assign_table flex justify-center">
                                <ul className="mt-6 assign_table_bg border-gray-200 w-70">
                                  <li className="pl-3 pr-5 py-2 flex items-center justify-between text-sm  border-t-1">
                                    <span className="bg-blue-100 font-bold">
                                      동물 종
                                    </span>
                                    <span>{ani.animal.category.name}</span>
                                  </li>
                                  <li className="pl-3 pr-5 py-3 flex items-center justify-between text-sm  border-t-2">
                                    <span className="bg-blue-100 font-bold">
                                      등록 번호
                                    </span>
                                    <span>{ani.animal.animal_reg_num}</span>
                                  </li>
                                  <li className="pl-3 pr-5 py-3 flex items-center justify-between text-sm  border-t-2">
                                    <span className="bg-blue-100 font-bold">
                                      사이즈
                                    </span>
                                    <span>{ani.animal.size}</span>
                                  </li>
                                  <li className="pl-3 pr-5 py-3 flex items-center justify-between text-sm  border-t-2">
                                    <span className="bg-blue-100 font-bold">
                                      성별
                                    </span>
                                    <span>{ani.animal.sex}</span>
                                  </li>
                                  <li className="pl-3 pr-5 py-4 flex items-center justify-between text-sm  border-t-1">
                                    <span className="bg-blue-100 font-bold">
                                      나이
                                    </span>
                                    <span> {ani.animal.age} 살</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header flex flex-wrap justify-center" id="form">
        <div className="notice_header rounded-md shadow-md overflow-hidden pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <p className="text-center text-blue-900 font-bold text-xl mb-5">
            ⬇ 선택하신 크루원 정보가 표시됩니다. ⬇
          </p>
          {filtAssign
            ?.filter((filt) => filt.assignment_no === selectanimalAssign)
            .map((a) => (
              <div className="flex flex-wrap justify-center" id="filtAssignDiv">
                <div className="flex-none place-items-center">
                  <img src={a.animal.image} alt="" className="w-72" />
                </div>
                <div className="flex-none mx-4 justify-items-center">
                  <div className="flex justify-center">
                    <ul className="w-72">
                      <li className="flex justify-between mt-2">
                        <span className="bg-blue-100 font-bold">동물 종</span>
                        <span>{a.animal.category.name}</span>
                      </li>
                      <li className="flex justify-between mt-2">
                        <span className="bg-blue-100 font-bold">사이즈</span>
                        <span>{a.animal.size}</span>
                      </li>
                      <li className="flex justify-between mt-2">
                        <span className="bg-blue-100 font-bold">성별</span>
                        <span>{a.animal.sex}</span>
                      </li>
                      <li className="flex justify-between mt-2">
                        <span className="bg-blue-100 font-bold">나이</span>
                        <span>{a.animal.age}</span>
                      </li>
                      <li className="flex items-center justify-between mt-2">
                        <span className="bg-blue-100 font-bold">등록번호</span>
                        <span>{a.animal.animal_reg_num}</span>
                      </li>
                      <li className="flex items-center justify-between mt-2">
                        <span className="bg-blue-100 font-bold">발견 장소</span>
                        <span>{a.animal.place_of_discovery}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}

          {review && clicked === 0 && (
            <div className="flex flex-wrap justify-center">
              <div className="flex-none place-items-center">
                <img
                  src={review?.adoptassignment.animal.image}
                  alt=""
                  className="w-72"
                />
              </div>
              <div className="flex-none mx-4 justify-items-center">
                <div className="flex justify-center">
                  <ul className="w-72">
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">동물 종</span>
                      <span>{review.adoptassignment.animal.category.name}</span>
                    </li>
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">사이즈</span>
                      <span>{review.adoptassignment.animal.size}</span>
                    </li>
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">성별</span>
                      <span>{review.adoptassignment.animal.sex}</span>
                    </li>
                    <li className="flex justify-between mt-2">
                      <span className="bg-blue-100 font-bold">나이</span>
                      <span>{review.adoptassignment.animal.age}</span>
                    </li>
                    <li className="flex items-center justify-between mt-2">
                      <span className="bg-blue-100 font-bold">등록번호</span>
                      <span>
                        {review.adoptassignment.animal.animal_reg_num}
                      </span>
                    </li>
                    <li className="flex items-center justify-between mt-2">
                      <span className="bg-blue-100 font-bold">발견 장소</span>
                      <span>
                        {review.adoptassignment.animal.place_of_discovery}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ----------------------------- */}
      {/* 리뷰 글 폼 */}

      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-md shadow-md overflow-hidden pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <form
            onSubmit={handleSubmit}
            className="review_header rounded-md sm:px-0 md:px-20 pt-6 pb-8"
          >
            {/* 제목 입력 input 박스 */}
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="notice_header rounded-xl px-10 pt-6 pb-8"
              >
                <div className="ml-3 mb-3 w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
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
                  {saveErrorMessages.title?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      제목을 한글로 입력해주세요.
                    </p>
                  ))}
                  <br />

                  {/* 내용 입력 input 박스 */}
                  <div className="ml-3 mb-3 w-full ">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
                      내용
                    </span>
                  </div>

                  <textarea
                    type="text"
                    name="content"
                    value={fieldValues.content}
                    onChange={handleFieldChange}
                    placeholder="내용을 입력해주세요."
                    className="rounded-xl text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 w-full p-3 mb-6 h-60"
                  />
                  {saveErrorMessages.content?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      내용을 입력해주세요.
                    </p>
                  ))}
                </div>

                {/* 이미지 첨부 인풋박스 */}
                <div className="mt-3 ml-3 mb-3 w-full">
                  <span className=" block uppercase tracking-wide text-blue-900 text-base font-bold mb-2 ">
                    이미지 첨부
                  </span>
                  <h2 className="text-gray-500 text-xs">
                    ( 최대 5개까지 이미지를 등록할 수 있습니다. )
                  </h2>

                  <div className="flex justify-center bg-white px-4 py-5 w-full">
                    {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                    <ul>
                      {/* 개별 이미지 input 박스 1*/}
                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
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
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}

                      {/* 이미지2 첨부 인풋박스 */}

                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image2"
                          onChange={(e) => {
                            imgpreview2(e, e.target.files[0]);
                          }}
                        />
                        {!fieldValues.image2 && (
                          <div>
                            <img src={review?.image2} alt="" className="h-44" />
                          </div>
                        )}

                        <div>
                          <img src={image2} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage2('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                image2: '',
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.image2?.map((message, index) => (
                        <p key={index} className="text-xs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}

                      {/* 이미지3 첨부 인풋박스 */}

                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image3"
                          onChange={(e) => {
                            imgpreview3(e, e.target.files[0]);
                          }}
                        />
                        {!fieldValues.image3 && (
                          <div>
                            <img src={review?.image3} alt="" className="h-44" />
                          </div>
                        )}

                        <div>
                          <img src={image3} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage3('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                image3: '',
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.image3?.map((message, index) => (
                        <p key={index} className="text-xs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}

                      {/* 이미지4 첨부 인풋박스 */}

                      {/* 개별 이미지 input 박스 1*/}
                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image4"
                          onChange={(e) => {
                            imgpreview4(e, e.target.files[0]);
                          }}
                        />
                        {!fieldValues.image4 && (
                          <div>
                            <img src={review?.image4} alt="" className="h-44" />
                          </div>
                        )}

                        <div>
                          <img src={image4} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage4('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                image4: '',
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.image4?.map((message, index) => (
                        <p key={index} className="text-xs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}

                      {/* 이미지5 첨부 인풋박스 */}

                      <li className="flex justify-between items-center text-base px-4 py-3 border-2 rounded-md xs:mr-5 sm:mr-0">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .jfif"
                          name="image5"
                          onChange={(e) => {
                            imgpreview5(e, e.target.files[0]);
                          }}
                        />
                        {!fieldValues.image5 && (
                          <div>
                            <img src={review?.image5} alt="" className="h-44" />
                          </div>
                        )}

                        <div>
                          <img src={image5} alt="" className="h-44" />
                        </div>

                        <button
                          className="rounded-full px-2 py-1 bg-sky-300"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage5('');
                            setFieldValues((prevFieldValues) => {
                              return {
                                ...prevFieldValues,
                                image5: '',
                              };
                            });
                          }}
                        >
                          X
                        </button>
                      </li>
                      {saveErrorMessages.image5?.map((message, index) => (
                        <p key={index} className="text-xs text-red-400">
                          이미지 첨부가 필요합니다!
                        </p>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
                    onClick={(e) => handleSubmit(e)}
                    onSubmit={handleSubmit}
                  >
                    저장
                  </button>

                  <button
                    onClick={() => {
                      navigate(`/review/${reviewId ? reviewId : ''}`);
                    }}
                    className=" ml-3 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    취소
                  </button>

                  <div className="p-5">
                    {saveLoading && (
                      <LoadingIndicator>저장 중...</LoadingIndicator>
                    )}
                    {saveError && (
                      <>
                        <p className="text-red-400">
                          `저장 중 에러가 발생했습니다. 메세지를 확인해주세요.`
                        </p>
                      </>
                    )}
                  </div>
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
