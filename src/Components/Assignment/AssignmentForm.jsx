import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'hooks/useFieldValues';
import DebugStates from 'DebugStates';
import { useEffect, useMemo, useState } from 'react';
import './Assignment.css';
import '../../App.css';

const INIT_FIELD_VALUES = {
  adopter_name: '',
  monthly_income: '',
  residential_type: '아파트',
  have_pet_or_not: false,
  status: '신청',
  protection_status: '입양 대기',
  category: '강아지',
  size: '소형',
  sex: '암컷',
};

function AssignmentForm({ handleDidSave }) {
  const { auth } = useAuth();
  const [filter, setFilter] = useState({});
  const [filtAnimal, setFiltAnimal] = useState([]);
  const [selanimal, setSelanimal] = useState(null);

  INIT_FIELD_VALUES.user = auth.userID;

  const [help, setHelp] = useState(false);
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

  useEffect(() => {
    setFilter({
      protection_status: '입양 대기',
      category: fieldValues.category,
      size: fieldValues.size,
      sex: fieldValues.sex,
    });
  }, [fieldValues]);

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
        <div className="justify-center rounded ">
          <div className=" flex flex-wrap justify-center  max-w-m">
            <br />
            <blockquote className="mt-10 mb-3 text-2xl font-semibold italic text-center text-slate-900">
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block text-6xl font-extrabold">
                <span className="relative text-white">" 크루원 모집"</span>
              </span>
            </blockquote>
            <br />
          </div>
        </div>
      </div>
      <div className="header">
        {/* 동물 검색하는 부분 */}
        <div className="assignments_header">
          <div className=" header justify-center rounded px-20 pt-6  mb-4">
            <div className=" flex flex-wrap justify-center w-full max-w-m">
              <div className="bg-white shadow-md  rounded px-20 pt-6 pb-8 mb-4">
                <span className="mb-3 block uppercase tracking-wide text-gray-700 text-2xl font-bold text-center">
                  🐶 크루원 검색 하기 🐱
                </span>
                <hr readOnly />

                <div className="ml-3 mt-3">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    {/* 크루 선택 (개/고양이) */}
                    <span className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                      크루원 타입
                    </span>
                    <div className="relative">
                      <select
                        name="category"
                        value={fieldValues.category}
                        onChange={handleFieldChange}
                        className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue="강아지"
                      >
                        <option value="강아지">강아지</option>
                        <option value="고양이">고양이</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                        <svg
                          className="fill-current h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <br />
                    {/* 크루원 덩치 선택 */}
                    <span className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                      크루원 덩치
                    </span>
                    <div className="relative">
                      <select
                        name="size"
                        value={fieldValues.size}
                        onChange={handleFieldChange}
                        className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue="소형"
                      >
                        <option value="소형">소형</option>
                        <option value="중형">중형</option>
                        <option value="대형">대형</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                        <svg
                          className="fill-current h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>

                    <br />
                    {/* 크루원 성별 선택 */}
                    <span className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                      크루원 성별
                    </span>
                    <div className="relative">
                      <select
                        name="sex"
                        value={fieldValues.sex}
                        onChange={handleFieldChange}
                        className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue="암컷"
                      >
                        <option value="암컷">암컷</option>
                        <option value="수컷">수컷</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                        <svg
                          className="fill-current h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>

                    {/* 버튼 클릭 부분 */}
                    <div className="">
                      <div className="flex px-3 mb-6 md:mb-0 justify-center p-5">
                        <button
                          onClick={() =>
                            setFiltAnimal(
                              QueryAnimal?.filter(
                                (animal) =>
                                  animal.category.name === filter.category &&
                                  animal.size === filter.size &&
                                  animal.sex === filter.sex &&
                                  animal.protection_status === '입양 대기',
                              ),
                            )
                          }
                          className="icon_size2 hover:scale-110 duration-500"
                          readOnly
                        >
                          <img src="/searchicon2.png" alt="button"></img>
                        </button>
                      </div>
                      {/* 검색한 동물 보여주기 */}
                      <div className="px-3 mb-6 md:mb-0">
                        {filtAnimal.map((a) => (
                          <div
                            className="inline-block p-2 m-2 w-40 rounded border-2 border-sky-400 cursor-pointer hover:scale-110 overflow-hidden"
                            onClick={() => setSelanimal(a.animal_no)}
                          >
                            <div className="flex justify-center h-44">
                              <img
                                src={a.image}
                                alt=""
                                className="object-cover hover:object-contain w-full"
                              />
                            </div>
                            <h2>나이 : {a.age} 세</h2>
                            <h2>
                              발견 장소 :
                              {a.place_of_discovery.length > 4
                                ? a.place_of_discovery.substr(0, 3) + '...'
                                : a.place_of_discovery}
                            </h2>
                            <h2>건강 상태 : {a.physical_condition}</h2>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* 신청하는 폼 */}

        <div className="header ">
          <div className="flex flex-wrap justify-center max-w-m">
            <form
              className="assignments_header shadow-md  rounded px-20 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              {/* 신청자 이름 */}
              <div className="ml-3 -mx-3 mb-6">
                <div className="ml-3 mb-3 w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                    신청자 이름
                  </span>
                  <input
                    type="text"
                    name="adopter_name"
                    value={fieldValues.adopter_name}
                    onChange={handleFieldChange}
                    placeholder="신청자 이름을 입력해주세요."
                    className="rounded p-3 text-sm  bg-gray-100 focus:outline-none focus:border focus:border-gray-400  w-full md:w-1/2 px-3 mb-6 md:mb-0"
                  />
                  <button
                    onClick={(e) => putAuthName(e)}
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    readOnly
                  >
                    회원 정보와 동일
                  </button>
                </div>
              </div>

              {/* 신청자 월 수입 */}
              <div className="ml-3 flex flex-wrap -mx-3 mb-6 ">
                <div className="mb-3 ml-3 w-full">
                  <span className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-xl font-extrabold text-slate-700">
                    월 수입{' '}
                    <button onClick={() => setHelp(!help)}>
                      {' '}
                      <img src="/outline_help.png" alt="button"></img>
                    </button>
                    {help && (
                      <div className="mt-1 justify-center">
                        <p className="bg-yellow-100 text-red-300">* 알림 *</p>
                        <p className="bg-yellow-100 text-m text-blue-300">
                          반려동물도 정기적으로 건강 관리가 필요하며, <br />
                          그에 따른 비용을 고려해야 합니다.
                        </p>
                        <p className="bg-yellow-100 text-gray-400">
                          ( 월 수입을 10,000원 단위로 입력해주세요.)
                        </p>
                      </div>
                    )}
                  </span>
                  <input
                    type="number"
                    name="monthly_income"
                    value={fieldValues.monthly_income}
                    onChange={handleFieldChange}
                    className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {'  '}만원
                </div>
              </div>

              {/* 주거형태 */}
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="mb-3 ml-4 inline-block relative w-64 pb-2">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-xl font-extrabold text-slate-700">
                    주거 형태{' '}
                  </span>
                  <div className="relative">
                    <select
                      name="residential_type"
                      value={fieldValues.residential_type}
                      onChange={handleFieldChange}
                      className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      defaultValue="아파트"
                    >
                      <option value="아파트">아파트</option>
                      <option value="빌라">빌라</option>
                      <option value="주택">주택</option>
                      <option value="원룸">원룸</option>
                      <option value="오피스텔">오피스텔</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
              </div>

              {/* 반려동물 유무 */}
              <div className="ml-3 flex flex-wrap -mx-3 mb-2">
                <div className="mb-3 w-full md:w-1/2 px-3 mb-6 ">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-xl font-extrabold text-slate-700">
                    반려동물 키움 여부{' '}
                    <input
                      type="checkbox"
                      onChange={handleFieldChange}
                      name="have_pet_or_not"
                      checked={fieldValues.have_pet_or_not}
                    />
                  </span>

                  <p>확인용 절차입니다.</p>
                </div>
              </div>

              {/* 거주지 사진 */}
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="mb-3 w-full px-3">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xl font-extrabold text-slate-700 pb-2">
                    거주지 사진{' '}
                  </span>
                  <p className="text-blue-400 mb-1">
                    최소 세 장의 신청자의 현 거주지 사진 업로드가 필요합니다!
                  </p>
                  <div>
                    <input
                      type="file"
                      name="picture_of_residence1"
                      accept=".png, .jpg, .jpeg, .jfif"
                      onChange={handleFieldChange}
                      className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 text-sm"
                    />
                    <br />
                    <input
                      type="file"
                      name="picture_of_residence2"
                      accept=".png, .jpg, .jpeg, .jfif"
                      onChange={handleFieldChange}
                      className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 text-sm"
                    />
                    <br />
                    <input
                      type="file"
                      name="picture_of_residence3"
                      accept=".png, .jpg, .jpeg, .jfif"
                      onChange={handleFieldChange}
                      className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 만남 희망 장소 */}
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="ml-4 inline-block relative w-64 pb-2">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-xl font-extrabold text-slate-700">
                    만남 희망 장소{' '}
                  </span>
                  <select
                    name="place_to_meet"
                    value={fieldValues.place_to_meet}
                    onChange={handleFieldChange}
                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue="서울 강동구청 반려동물팀"
                  >
                    <option value="서울 강동구청 반려동물팀">
                      서울 강동구청 반려동물팀
                    </option>
                    <option value="대전 동물 보호 센터">
                      대전 동물 보호 센터
                    </option>
                    <option value="세종 유기동물 보호센터">
                      세종 유기동물 보호센터
                    </option>
                    <option value="대구 유기동물 보호 협회">
                      대구 유기동물 보호 협회
                    </option>
                    <option value="부산 동물보호센터">부산 동물보호센터</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 pt-5">
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

              {/* 만남 희망 날짜 */}
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="ml-4 inline-block relative w-64 pb-2">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-xl font-extrabold text-slate-700">
                    만남 희망 날짜{' '}
                  </span>

                  <input
                    type="date"
                    name="date_to_meet"
                    onChange={handleFieldChange}
                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  <p className="text-blue-400 mb-2 mt-1">
                    센터 방문 날짜를 선택해주세요!
                  </p>
                </div>
              </div>
              <div className="text-center hover:scale-110 duration-500">
                <button className="icon_size2" readOnly>
                  <img src="/assignicon2.png" alt="button"></img>
                </button>
              </div>
            </form>
            <hr className="border-2" />
          </div>
        </div>
      </div>
      <DebugStates fieldValues={fieldValues} />
    </>
  );
}

export default AssignmentForm;
