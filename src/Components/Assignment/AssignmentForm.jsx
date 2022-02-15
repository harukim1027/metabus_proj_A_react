import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'hooks/useFieldValues';
import DebugStates from 'DebugStates';
import { useEffect, useState } from 'react';
import './Assignment.css';

const INIT_FIELD_VALUES = {
  adopter_name: '',
  monthly_income: '',
  residential_type: '아파트',
  have_pet_or_not: false,
  status: '신청',
  protection_status: '입양 대기',
  size: '소형',
  sex: '암컷',
};

function AssignmentForm({ handleDidSave }) {
  const { auth } = useAuth();
  const [filter, setFilter] = useState({});
  const [filtAnimal, setFiltAnimal] = useState([]);
  const [selanimal, setSelanimal] = useState(null);

  INIT_FIELD_VALUES.user = auth.userID;

  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  fieldValues.animal = selanimal;

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
      console.log(savedPost);
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  // 이름 폼에 현재 로그인한 이름 입력
  const putAuthName = (e) => {
    e.preventDefault();
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        adopter_name: auth.name,
      };
    });
  };

  console.log('---------------');
  console.log('QueryAnimal: ', QueryAnimal);
  console.log('filter: ', filter);
  console.log('filtAnimal: ', filtAnimal);

  return (
    <>
      <div className="header">
        <h2 className="text-6xl font-extrabold">크루원 모집</h2>
      </div>
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
          defaultValue="소형"
        >
          <option value="소형">소형</option>
          <option value="중형">중형</option>
          <option value="대형">대형</option>
        </select>
      </div>

      <div className="py-2">
        <h2 className="inline">크루원의 성별 : </h2>
        <select
          name="sex"
          value={fieldValues.sex}
          onChange={handleFieldChange}
          className="border-2 border-sky-400 rounded p-2"
          defaultValue="암컷"
        >
          <option value="암컷">암컷</option>
          <option value="수컷">수컷</option>
        </select>
      </div>
      <button
        onClick={() => {
          setFilter({
            protection_status: '입양 대기',
            size: fieldValues.size,
            sex: fieldValues.sex,
          });
        }}
        className="bg-sky-400 p-2 m-2 rounded-lg"
      >
        검색하기
      </button>
      <h2 className="inline">{`<< 클릭 후, 클릭 >>`}</h2>
      <button
        onClick={() =>
          QueryAnimal &&
          setFiltAnimal(
            filter &&
              QueryAnimal.filter(
                (animal) =>
                  animal.size === filter.size &&
                  animal.sex === filter.sex &&
                  animal.protection_status === '입양 대기',
              ),
          )
        }
        className="bg-sky-400 p-2 m-2 rounded-lg"
      >
        검색한 동물 보기
      </button>

      {/* 검색한 동물 보여주기 */}
      {/*   TODO: filtAnimal을 가지고 QueryAnimal에서 필터링해서 하나의 상태값에 저장
      상태값을 버튼형식으로 표출 -> 클릭시 fieldValues에 그 동물의 pk가 들어가도록 */}
      <div>
        {filtAnimal.map((a) => (
          <div
            className="inline-block p-2 m-2 rounded border-2 border-sky-400 w-1/5 cursor-pointer hover:scale-110"
            onClick={() => setSelanimal(a.animal_no)}
          >
            <div className="flex h-36 items-center">
              <img src={a.image} alt="" />
            </div>
            <h2>나이 : {a.age} 세</h2>
            <h2>발견 장소 : {a.place_of_discovery}</h2>
            <h2>건강 상태 : {a.physical_condition}</h2>
          </div>
        ))}
      </div>

      {/* ----------------------------- */}
      {/* 신청하는 폼 */}
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
            defaultValue="아파트"
          >
            <option value="아파트">아파트</option>
            <option value="빌라">빌라</option>
            <option value="주택">주택</option>
            <option value="원룸">원룸</option>
            <option value="오피스텔">오피스텔</option>
          </select>
        </div>
        {/* 처리해야할 부분 */}
        <div className="py-2">
          <h2 className="inline">반려동물 유무 : </h2>
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
            defaultValue="서울 강동구청 반려동물팀"
          >
            <option value="서울 강동구청 반려동물팀">
              서울 강동구청 반려동물팀
            </option>
            <option value="대전 동물 보호 센터">대전 동물 보호 센터</option>
            <option value="세종 유기동물 보호센터">
              세종 유기동물 보호센터
            </option>
            <option value="대구 유기동물 보호 협회">
              대구 유기동물 보호 협회
            </option>
            <option value="부산 동물보호센터">부산 동물보호센터</option>
          </select>
        </div>
        <div className="py-2">
          <input
            type="date"
            name="date_to_meet"
            onChange={handleFieldChange}
            className="border-2 border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button>신청하기</button>
      </form>
      <hr className="border-2" />

      <DebugStates fieldValues={fieldValues} />
    </>
  );
}

export default AssignmentForm;
