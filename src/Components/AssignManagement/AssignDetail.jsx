import { useApiAxios } from 'api/base';
import { useEffect } from 'react';

function AssignDetail({ assignId }) {
  const [{ data: assignData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/${assignId}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <h2>assign detail</h2>
      <h2>신청 번호 : {assignData?.assignment_no}</h2>
      <h2>신청일 : {assignData?.created_at}</h2>
      <h2>신청시 기입한 이름 : {assignData?.adopter_name}</h2>
      <h2>회원명 : {assignData?.user.name}</h2>
      <h2>회원 연락처 : {assignData?.user.phone_number}</h2>
      <h2>회원 e-mail : {assignData?.user.email}</h2>
      <h2>월 수입 : {assignData?.monthly_income}만</h2>
      <h2>주거 형태 : {assignData?.residential_type}</h2>
      <h2>애완동물 유무 : {assignData?.have_pet_or_not ? '있음' : '없음'}</h2>
      <h2>거주지 사진1</h2>
      <img src={assignData?.picture_of_residence1} alt="" />
      <h2>거주지 사진2</h2>
      <img src={assignData?.picture_of_residence2} alt="" />
      <h2>거주지 사진3</h2>
      <img src={assignData?.picture_of_residence3} alt="" />
      <h2>만남 희망 장소 : {assignData?.place_to_meet}</h2>
      <h2>만남 희망일 : {assignData?.date_to_meet}</h2>
      <h2>진행 상태 : {assignData?.status}</h2>
    </>
  );
}
export default AssignDetail;
