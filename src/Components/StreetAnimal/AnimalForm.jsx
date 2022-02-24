import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import Button from 'Button';
import { useEffect, useState } from 'react';
import produce from 'immer';
import LoadingIndicator from 'LoadingIndicator';

const INIT_FIELD_VALUES = {
  animal_reg_num: '',
  category: '강아지',
  size: '소형',
  sex: '암컷',
  age: '',
  date_of_discovery: '',
  place_of_discovery: '',
  info: '',
  start_date: '',
  end_date: '',
  protection_status: '',
  image: '',
};

// 사진 등록 시
function AnimalForm({ animalId, handleDidSave }) {
  const { auth } = useAuth();
  const [image, setImage] = useState('');

  const imgpreview = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  // 조회
  const [{ data: Animal, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${animalId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: !animalId },
  );

  // 저장
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !animalId
        ? '/streetanimal/api/animal/'
        : `/streetanimal/api/animal/${animalId}/`,
      method: !animalId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    Animal || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.image = '';
      }),
    );
  }, [Animal]);

  // 저장
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

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote className="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span className="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block">
              <span className="relative text-white">" 동물 등록 "</span>
            </span>
          </blockquote>

          <div className="flex justify-center px-4 py-5">
            <form onSubmit={handleSubmit}>
              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2">
                  동물 종 선택
                </span>
                <div className="relative">
                  <select
                    name="category"
                    value={fieldValues.category}
                    onChange={handleFieldChange}
                    className="text-lg block appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full"
                  >
                    <option value="강아지">강아지</option>
                    <option value="고양이">고양이</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-80 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2">
                  등록번호 입력
                </span>
                <input
                  name="animal_reg_num"
                  value={fieldValues.animal_reg_num}
                  onChange={handleFieldChange}
                  type="text"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  크기 선택
                </span>
                <div className="relative">
                  <select
                    name="size"
                    value={fieldValues.size}
                    onChange={handleFieldChange}
                    className="text-lg block appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3  w-full "
                    defaultValue="1"
                  >
                    <option value="소형">소형</option>
                    <option value="중형">중형</option>
                    <option value="대형">대형</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-80 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  성별 선택
                </span>
                <div className="relative">
                  <select
                    name="sex"
                    value={fieldValues.sex}
                    onChange={handleFieldChange}
                    className="text-lg block appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3  w-full "
                    defaultValue="1"
                  >
                    <option value="암컷">암컷</option>
                    <option value="수컷">수컷</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-80 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  나이 입력
                </span>
                <input
                  name="age"
                  value={fieldValues.age}
                  onChange={handleFieldChange}
                  type="number"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  발견 날짜 입력
                </span>
                <input
                  name="date_of_discovery"
                  value={fieldValues.date_of_discovery}
                  onChange={handleFieldChange}
                  type="datetime-local"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  발견 장소 입력
                </span>
                <input
                  name="place_of_discovery"
                  value={fieldValues.place_of_discovery}
                  onChange={handleFieldChange}
                  type="text"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  동물 정보 입력
                </span>
                <textarea
                  name="info"
                  value={fieldValues.info}
                  onChange={handleFieldChange}
                  type="text"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  보호 시작날짜 입력
                </span>
                <input
                  name="start_date"
                  value={fieldValues.start_date}
                  onChange={handleFieldChange}
                  type="date"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  보호 종료날짜 입력
                </span>
                <input
                  name="end_date"
                  value={fieldValues.end_date}
                  onChange={handleFieldChange}
                  type="date"
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3 w-full "
                />
              </div>

              <div className="my-10 items-center">
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  입양상태 선택
                </span>
                <div className="relative">
                  <select
                    name="protection_status"
                    value={fieldValues.protection_status}
                    onChange={handleFieldChange}
                    type="text"
                    className="text-lg block appearance-none bg-gray-100 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-4 py-3  w-full "
                  >
                    <option value="입양 대기">입양 대기</option>
                    <option value="입양 매칭 중">입양 매칭 중</option>
                    <option value="입양 완료">입양 완료</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-80 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 이미지 input 박스 */}
              <div>
                <span className="block tracking-wide text-gray-700 text-xl font-bold mb-2 ">
                  이미지 첨부
                </span>
                <ul>
                  <li className="flex justify-between items-center text-sm pl-3 pr-4 py-3 w-full border-2 rounded-md ml-32">
                    <input
                      name="image"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        imgpreview(e, e.target.files[0]);
                      }}
                      type="file"
                    />

                    {!fieldValues.image && (
                      <div>
                        <img src={Animal?.image} alt="" className="h-44" />
                      </div>
                    )}

                    <div>
                      <img src={image} alt="" className="h-44" />
                    </div>

                    <button
                      className="rounded-full px-2 py-1 bg-sky-300"
                      onClick={(e) => {
                        e.preventDefault();
                        setImage('');
                        setFieldValues((prevFieldValues) => {
                          return {
                            ...prevFieldValues,
                            image: '',
                          };
                        });
                      }}
                    >
                      X
                    </button>
                  </li>
                </ul>
              </div>

              {saveErrorMessages.image?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-6"
                  onClick={(e) => handleSubmit(e)}
                  onSubmit={handleSubmit}
                >
                  저장
                </button>
              </div>

              <div>
                {saveLoading && (
                  <LoadingIndicator>저장 중 ...</LoadingIndicator>
                )}
                {saveError &&
                  `저장 중 에러가 발생했습니다. (${saveError.response?.status} ${saveError.response?.statusText})`}
              </div>
            </form>
          </div>
        </div>
      </div>

      <DebugStates
        Animal={Animal}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default AnimalForm;
