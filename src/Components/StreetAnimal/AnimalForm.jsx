import { useApiAxios } from 'api/base';
import TopNav from 'Components/Main/TopNavi';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import Button from 'Button';
import { useEffect } from 'react';
import produce from 'immer';

const INIT_FIELD_VALUES = {
  animal_reg_num: '',
  category: '강아지',
  size: 1,
  sex: 1,
  age: '',
  date_of_discovery: '',
  place_of_discovery: '',
  physical_condition: '',
  start_date: '',
  end_date: '',
  protection_status: '',
  image: '',
};

function AnimalForm({ animalId, handleDidSave }) {
  const { auth } = useAuth();

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
      <TopNav />
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
          <span>크기 입력</span>
          <select
            name="size"
            value={fieldValues.size}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-1 ml-2"
            defaultValue="1"
          >
            <option value="1">소형</option>
            <option value="2">중형</option>
            <option value="3">대형</option>
          </select>
        </div>

        <div className="my-3">
          <span>성별 입력</span>
          <select
            name="sex"
            value={fieldValues.sex}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-1 ml-2"
            defaultValue="1"
          >
            <option value="1">암컷</option>
            <option value="2">수컷</option>
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
            <option value="1">입양 대기</option>
            <option value="2">입양 매칭 중</option>
            <option value="3">입양 완료</option>
          </select>
        </div>

        <div className="my-3">
          <input
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleFieldChange}
            type="file"
            className="border-2 border-gray-300"
          />
        </div>

        <div className="my-3">
          <Button>저장</Button>
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
