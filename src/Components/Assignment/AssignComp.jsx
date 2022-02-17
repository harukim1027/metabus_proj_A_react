import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
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

  console.log('adaniData: ', adaniData);
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-10 border-2 border-sky-300 p-3 rounded-lg">
          <h2 className="text-4xl font-bold text-center">입양신청 완료!</h2>
          <img src={adaniData?.image} alt="" />
          <h2>등록번호 : {adaniData?.animal_reg_num}</h2>
          <h2>성별 : {adaniData?.sex}</h2>
          <h2>크기 : {adaniData?.size}</h2>
          <h2>이 위치에 동물 품종</h2>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <h2 className="text-xl font-semibold">
          진행 상황은 마이 페이지에서 확인하실 수 있어요!
        </h2>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="shadow bg-green-400 w-1/5 py-2 rounded-lg hover:bg-green-600 hover:text-white"
          onClick={() => navigate('/mypage/assigninfo/')}
        >
          마이페이지
        </button>
      </div>
      <div className="flex justify-center mt-5">
        <button className="shadow bg-blue-400 w-1/5 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
          신청 정보
        </button>
      </div>
      <div className="flex justify-center mt-5 mb-20">
        <button
          className="shadow bg-gray-300 w-1/5 py-2 rounded-lg hover:bg-gray-600 hover:text-white"
          onClick={() => navigate('/')}
        >
          메인 화면
        </button>
      </div>
    </>
  );
}

export default AssignComp;
