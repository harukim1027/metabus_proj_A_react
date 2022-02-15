import { useApiAxios } from 'api/base';
import { useEffect } from 'react';

function AssignList() {
  const [{ data: assignData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <h2>입양신청 관리</h2>
      {assignData?.map((assign) => (
        <div className="inline-block border-2 border-black">
          <h2>신청번호 : {assign.assignment_no}</h2>
          <h2>신청자명 : {assign.adopter_name}</h2>
          <h2>월 수입 :{assign.monthly_income}</h2>
          <h2>
            거주형태 : {assign.residential_type === 'Apartment' && '아파트'}
            {assign.residential_type === 'Villa' && '빌라'}
            {assign.residential_type === 'Housing' && '주택'}
            {assign.residential_type === 'Oneroom' && '원룸'}
            {assign.residential_type === 'Officetel' && '오피스텔'}
          </h2>
          <h2>{assign.animal}</h2>
        </div>
      ))}
    </>
  );
}

export default AssignList;
