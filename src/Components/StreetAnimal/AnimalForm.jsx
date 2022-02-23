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
  physical_condition: '',
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
    <div>
      <h2>AnimalForm</h2>

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <span>동물 종 선택</span>
          <select
            name="category"
            value={fieldValues.category}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-1 ml-2"
          >
            <option value="강아지">강아지</option>
            <option value="고양이">고양이</option>
          </select>
        </div>

        <div className="my-3">
          <span>등록번호 입력</span>
          <input
            name="animal_reg_num"
            value={fieldValues.animal_reg_num}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>크기 선택</span>
          <select
            name="size"
            value={fieldValues.size}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-1 ml-2"
            defaultValue="1"
          >
            <option value="소형">소형</option>
            <option value="중형">중형</option>
            <option value="대형">대형</option>
          </select>
        </div>

        <div className="my-3">
          <span>성별 선택</span>
          <select
            name="sex"
            value={fieldValues.sex}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-1 ml-2"
            defaultValue="1"
          >
            <option value="암컷">암컷</option>
            <option value="수컷">수컷</option>
          </select>
        </div>

        <div className="my-3">
          <span>나이 입력</span>
          <input
            name="age"
            value={fieldValues.age}
            onChange={handleFieldChange}
            type="number"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>발견 날짜 입력</span>
          <input
            name="date_of_discovery"
            value={fieldValues.date_of_discovery}
            onChange={handleFieldChange}
            type="datetime-local"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>발견 장소 입력</span>
          <input
            name="place_of_discovery"
            value={fieldValues.place_of_discovery}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>건강 상태 입력</span>
          <textarea
            name="physical_condition"
            value={fieldValues.physical_condition}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>보호 시작날짜 입력</span>
          <input
            name="start_date"
            value={fieldValues.start_date}
            onChange={handleFieldChange}
            type="date"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>보호 종료날짜 입력</span>
          <input
            name="end_date"
            value={fieldValues.end_date}
            onChange={handleFieldChange}
            type="date"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>입양상태 입력</span>
          <select
            name="protection_status"
            value={fieldValues.protection_status}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          >
            <option value="입양 대기">입양 대기</option>
            <option value="입양 매칭 중">입양 매칭 중</option>
            <option value="입양 완료">입양 완료</option>
          </select>
        </div>

        {/* 이미지 input 박스 */}
        <div className="my-3">
          <input
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              imgpreview(e, e.target.files[0]);
            }}
            type="file"
            className="border-2 border-gray-300"
          />

          {!fieldValues.image && (
            <div>
              <img src={Animal?.results.image} alt="" className="h-44" />
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
        </div>
        {saveErrorMessages.image?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <div className="my-3">
          <Button>저장</Button>

          <div>
            {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
            {saveError &&
              `저장 중 에러가 발생했습니다. (${saveError.response?.status} ${saveError.response?.statusText})`}
          </div>
        </div>
      </form>

      <DebugStates
        Animal={Animal}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default AnimalForm;
