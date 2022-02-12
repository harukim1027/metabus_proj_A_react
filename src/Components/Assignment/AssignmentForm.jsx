import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'hooks/useFieldValues';
import SearchAnimal from './SearchAnimal';
import './Assignment.css';
import DebugStates from 'DebugStates';
import { useEffect, useState } from 'react';

const INIT_FIELD_VALUES = {
  adopter_name: '',
  monthly_income: '',
  residential_type: 'Apartment',
  have_pet_or_not: false,
  status: 1,
  size: 1,
  sex: 1,
};

function AssignmentForm({ handleDidSave }) {
  const { auth } = useAuth();
  const [filtAnimal, setFiltAnimal] = useState({});
  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  const [
    { data: QueryAnimal, loading: getLoading, error: getError },
    queryanimal,
  ] = useApiAxios(
    {
      url: `/streetanimal/api/animal/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    queryanimal();
  }, []);

  // TODO: filtAnimal을 가지고 QueryAnimal에서 필터링해서 하나의 상태값에 저장
  // 상태값을 버튼형식으로 표출 -> 클릭시 fieldValues에 그 동물의 pk가 들어가도록

  // 저장 api 요청
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  // 신청 저장
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

  const putAuthName = (e) => {
    e.preventDefault();
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        adopter_name: auth.name,
      };
    });
  };

  return (
    <>
      <h2 className="header text-4xl font-extrabold font-sans">크루원 모집</h2>
      <hr className="border-2" />
      {/* 동물 검색하는 부분 */}

      <h2>크루원 검색</h2>
      <div className="py-2">
        <h2 className="inline">크루원의 사이즈 : </h2>
        <select
          name="size"
          value={fieldValues.size}
          onChange={handleFieldChange}
          className="border-2 border-sky-400 rounded p-2"
          defaultValue="1"
        >
          <option value="1">소형</option>
          <option value="2">중형</option>
          <option value="3">대형</option>
        </select>
      </div>

      <div className="py-2">
        <h2 className="inline">크루원의 성별 : </h2>
        <select
          name="sex"
          value={fieldValues.sex}
          onChange={handleFieldChange}
          className="border-2 border-sky-400 rounded p-2"
          defaultValue="1"
        >
          <option value="1">암컷</option>
          <option value="2">수컷</option>
        </select>
      </div>
      <button
        onClick={() =>
          setFiltAnimal({
            size: fieldValues.size,
            sex: fieldValues.sex,
          })
        }
      >
        검색하기
      </button>

      {/* 검색한 동물 보여주기 */}
      {filtAnimal && (
        <h2>
          {filtAnimal.size}, {filtAnimal.sex}
        </h2>
      )}
      {/* ----------------------------- */}

      <hr className="border-2" />
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <h2 className="inline">신청자 이름</h2>
          <input
            type="text"
            name="adopter_name"
            value={fieldValues.adopter_name}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
          />
          <button
            onClick={(e) => putAuthName(e)}
            className="rounded px-2 py-1 bg-sky-200 mt-4 ml-3"
          >
            회원 정보와 동일
          </button>
        </div>
        <div className="py-2">
          <h2 className="inline">월 수입</h2>
          <input
            type="number"
            name="monthly_income"
            value={fieldValues.monthly_income}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
          />
        </div>
        <div className="py-2">
          <h2 className="inline">주거 형태</h2>
          <select
            name="residential_type"
            value={fieldValues.residential_type}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
            defaultValue="Apartment"
          >
            <option value="Apartment">아파트</option>
            <option value="Villa">빌라</option>
            <option value="Housing">주택</option>
            <option value="Oneroom">원룸</option>
            <option value="Officetel">오피스텔</option>
          </select>
        </div>
        <div className="py-2">
          <h2>반려동물 유무</h2>
          <input
            type="checkbox"
            onChange={handleFieldChange}
            name="have_pet_or_not"
            checked={fieldValues.have_pet_or_not}
          />
        </div>
        <div className="py-2">
          <h2>거주지 사진</h2>
          <input
            type="file"
            name="picture_of_residence1"
            accept=".png, .jpg, .jpeg, .jfif"
            onChange={handleFieldChange}
            className="bg-sky-300 p-2 rounded mr-4"
          />
          <input
            type="file"
            name="picture_of_residence2"
            accept=".png, .jpg, .jpeg, .jfif"
            onChange={handleFieldChange}
            className="bg-sky-300 p-2 rounded mr-4"
          />
          <input
            type="file"
            name="picture_of_residence3"
            accept=".png, .jpg, .jpeg, .jfif"
            onChange={handleFieldChange}
            className="bg-sky-300 p-2 rounded mr-4"
          />
        </div>
        <div className="py-2">
          <h2 className="inline">크루 접선 장소</h2>
          <select
            name="place_to_meet"
            value={fieldValues.place_to_meet}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
            defaultValue="Seoul"
          >
            <option value="Seoul">서울 강동구청 반려동물팀</option>
            <option value="Daejeon">대전 동물 보호 센터</option>
            <option value="Saejong">세종 유기동물 보호센터</option>
            <option value="Daegu">대구 유기동물 보호 협회</option>
            <option value="Busan">부산 동물보호센터</option>
          </select>
        </div>
        <button>신청하기</button>
      </form>
      <hr className="border-2" />

      <DebugStates fieldValues={fieldValues} />
    </>
  );
}

export default AssignmentForm;
