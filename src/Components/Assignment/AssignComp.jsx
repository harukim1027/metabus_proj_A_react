import { useApiAxios } from 'api/base';
import { useEffect } from 'react';

function AssignComp({ assignId, assignData }) {
  console.log('assignData: ', assignData);
  const [{ loading, error }, changeAPS] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${assignData?.animal}/`,
      method: 'PATCH',
      data: { protection_status: '2' },
    },
    { manual: true },
  );

  const [{ data: adaniData }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${assignData?.animal}/`,
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
      <h2>입양신청 완료!</h2>
      <img src={adaniData?.image} alt="" />
      {adaniData?.animal_reg_num}
    </>
  );
}

export default AssignComp;
