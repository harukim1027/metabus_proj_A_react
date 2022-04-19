import { useApiAxios } from 'api/base';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignComp({ assignId, assignData }) {
  const navigate = useNavigate();

  // console.log('assignData: ', assignData);

  // patch  요청
  const [{ loading, error }, changeAPS] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${assignData?.animal.animal_no}/`,
      method: 'PATCH',
      data: { protection_status: '입양 매칭 중' },
    },
    { manual: true },
  );

  // get요청
  const [{ data: adaniData }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${assignData?.animal.animal_no}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    changeAPS();
    refetch();
  }, [assignData]);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [adaniData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [adaniData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 assignments_header rounded-xl shadow-md overflow-hidden md:px-20 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 mb-3 font-semibold italic text-center text-slate-900">
            <span class="my-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-400 relative inline-block xs:text-2xl sm:text-4xl lg:text-6xl">
              <span class="relative text-white">" 입양신청 완료! "</span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}
          {error?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
            </div>
          )}

          <h2 className="text-center text-xl">
            등록번호 : {adaniData?.animal_reg_num}
          </h2>
          <div className="flex justify-center my-3">
            <img src={adaniData?.image} alt="" className="h-80" />
          </div>
          <div className="flex justify-center my-3">
            <ul className=" w-1/3 font-semibold text-lg">
              <li className="flex justify-center text-xl">
                <h2 className="bg-blue-100 rounded-xl px-1">
                  {adaniData?.category.name}
                </h2>
              </li>
              <hr className="border-2 my-1" />
              <li className="flex justify-between">
                <h2 className="mx-2">성별</h2>
                <h2 className="mx-2">{adaniData?.sex}</h2>
              </li>
              <hr className="border-2 my-1" />
              <li className="flex justify-between">
                <h2 className="mx-2">크기</h2>
                <h2 className="mx-2">{adaniData?.size}</h2>
              </li>
              <hr className="border-2 my-1" />
              <li className="flex justify-between">
                <h2 className="mx-2">나이</h2>
                <h2 className="mx-2">{adaniData?.age}살</h2>
              </li>
              <hr className="border-2 my-1" />
            </ul>
          </div>
          <div className="flex justify-center my-5 mt-5">
            <h2 className="font-semibold xs:text-base sm:text-lg lg:text-2xl">
              진행 상황은 마이 페이지에서 확인하실 수 있어요!
            </h2>
          </div>
          <p className="animate-bounce text-4xl text-center">⬇</p>
          <div className="flex justify-center my-5">
            <button
              className="shadow bg-green-400 px-5 py-2 rounded-lg hover:bg-green-600 hover:text-white xs:w-5/6 sm:w-1/2 lg:1/4"
              onClick={() => navigate(`/mypage/assigninfo/`)}
            >
              마이페이지 - 신청 정보
            </button>
          </div>
          <div className="flex justify-center my-5">
            <button
              className="shadow bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-600 hover:text-white xs:w-5/6 sm:w-1/2 lg:1/4"
              onClick={() => navigate('/')}
            >
              메인 화면
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignComp;
