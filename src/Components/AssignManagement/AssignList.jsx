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
        <div className="">
          <span>{assign.assignment_no}</span>
          <span>{assign.adopter_name}</span>
          <span>{assign.monthly_income}</span>
          <span>{assign.residential_type}</span>
        </div>
      ))}
    </>
  );
}

export default AssignList;
