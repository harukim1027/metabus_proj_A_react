import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignStatus from './AssignStatus';

function AssignDetail({ assignId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
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

  const [{ loading: deleteLoading, error: deleteError }, deleteAssign] =
    useApiAxios(
      {
        url: `/adopt_assignment/api/assignment/${assignId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const [{ loading, error }, changeAPS] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${assignData?.animal.animal_no}/`,
      method: 'PATCH',
      data: { protection_status: '입양 대기' },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteAssign().then(() => {
        changeAPS().then(() => {
          navigate('/admin/assignmanage/');
          window.location.reload();
        });
      });
    }
  };

  return (
    <>
      <div>
        <h2>신청자 정보</h2>
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
        <div>
          <h2 onClick={() => setClicked(!clicked)}>
            진행 상태 : {assignData?.status}
          </h2>
          {clicked && assignData && (
            <AssignStatus
              assignId={assignId}
              assignData={assignData}
              handleDidSave={(savedPost) => {
                savedPost && window.location.reload();
                savedPost && setClicked(0);
              }}
            />
          )}
        </div>
        <h2>--------------------♥--------------------</h2>
        <h2>동물 정보</h2>
        <h2>등록번호 : {assignData?.animal.animal_reg_num}</h2>
        <img src={assignData?.animal.image} alt="" />
        <h2>종류 : {assignData?.animal.category.name}</h2>
        <h2>사이즈 : {assignData?.animal.size}</h2>
        <h2>성별 : {assignData?.animal.sex}</h2>
        <h2>나이 : {assignData?.animal.age}세</h2>
        <h2>건강 상태 : {assignData?.animal.physical_condition}</h2>
        <h2>보호 시작일 : {assignData?.animal.start_date}</h2>
        <h2>보호 종료일 : {assignData?.animal.end_date}</h2>
      </div>
      <button onClick={() => handleDelete()}>삭제</button>
      <button onClick={() => navigate(`/admin/assignmanage/`)}>목록</button>
    </>
  );
}
export default AssignDetail;
