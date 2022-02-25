import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignComp({ assignId, assignData }) {
  const navigate = useNavigate();

  console.log('assignData: ', assignData);
  const [{ loading, error }, changeAPS] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${assignData?.animal.animal_no}/`,
      method: 'PATCH',
      data: { protection_status: '입양 매칭 중' },
    },
    { manual: true },
  );

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
  const [scrollY, setScrollY] = useState(0);
  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 1016,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
  };

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });
  // console.log('window Scroll From Top:', scrollY);

  useEffect(() => {
    gotoTop();
  }, [adaniData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-1/2">
          <blockquote class="mt-5 text-6xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="my-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-400 relative inline-block">
              <span class="relative text-white">" 입양신청 완료! "</span>
            </span>
          </blockquote>

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
            <h2 className="text-3xl font-semibold">
              진행 상황은 마이 페이지에서 확인하실 수 있어요!
            </h2>
          </div>
          <p className="animate-bounce text-4xl text-center">⬇</p>
          <div className="flex justify-center my-5">
            <button
              className="shadow bg-green-400 w-1/4 px-5 py-2 rounded-lg hover:bg-green-600 hover:text-white"
              onClick={() =>
                navigate(`/assignment/${assignData?.assignment_no}/`)
              }
            >
              마이페이지 - 신청 정보
            </button>
          </div>
          <div className="flex justify-center my-5">
            <button
              className="shadow bg-gray-300 w-1/4 px-5 py-2 rounded-lg hover:bg-gray-600 hover:text-white"
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
