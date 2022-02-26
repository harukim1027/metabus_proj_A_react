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

  // get 요청
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

  // delete 요청
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

  // patch 요청
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
      <div className="header flex justify-center">
        <div className="w-2/3 notice_header rounded-xl mx-20 my-10 px-20">
          <div className=" pt-6 mb-3">
            <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
              <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                <span class="relative text-white">" 신청자 정보 "</span>
              </span>
            </blockquote>
            {/* 로딩 에러 */}
            {loading && '로딩 중 ...'}
            {error && '로딩 중 에러가 발생했습니다.'}
            {error?.response?.status === 401 && (
              <div className="text-red-400">
                조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
              </div>
            )}

            <ul className="w-60">
              <li className="flex place-content-between">
                <h2>신청 번호</h2>
                <h2>{assignData?.assignment_no}</h2>
              </li>
            </ul>

            <h2>신청일 : {assignData?.created_at}</h2>
            <h2>신청시 기입한 이름 : {assignData?.adopter_name}</h2>
            <h2>회원명 : {assignData?.user.name}</h2>
            <h2>회원 연락처 : {assignData?.user.phone_number}</h2>
            <h2>회원 e-mail : {assignData?.user.email}</h2>
            <h2>월 수입 : {assignData?.monthly_income}만</h2>
            <h2>주거 형태 : {assignData?.residential_type}</h2>
            <h2>
              애완동물 유무 : {assignData?.have_pet_or_not ? '있음' : '없음'}
            </h2>
            <div className="flex justify-center content-center">
              <div className="flex flex-col border-2 border-gray-300 rounded-lg shadow-lg w-1/4 mx-2">
                <h2>거주지 사진1</h2>
                <hr className="border-2 border-gray-300" />
                <img
                  src={assignData?.picture_of_residence1}
                  alt=""
                  onClick={() => window.open(assignData?.picture_of_residence1)}
                  className="w-full cursor-pointer my-auto"
                />
              </div>

              <div className="border-2 border-gray-300 rounded-lg shadow-lg inline-block w-1/4 mx-2">
                <h2>거주지 사진2</h2>
                <hr className="border-2 border-gray-300" />
                <img
                  src={assignData?.picture_of_residence2}
                  alt=""
                  onClick={() => window.open(assignData?.picture_of_residence2)}
                  className="w-full cursor-pointer"
                />
              </div>
              <div className="border-2 border-gray-300 rounded-lg shadow-lg inline-block w-1/4 mx-2">
                <h2>거주지 사진3</h2>
                <hr className="border-2 border-gray-300" />
                <img
                  src={assignData?.picture_of_residence3}
                  alt=""
                  onClick={() => window.open(assignData?.picture_of_residence3)}
                  className="w-full cursor-pointer"
                />
              </div>
            </div>
            <h2>만남 희망 장소 : {assignData?.place_to_meet}</h2>
            <h2>만남 희망일 : {assignData?.date_to_meet}</h2>
            <div>
              <h2
                onClick={() => {
                  auth.is_staff && setClicked(!clicked);
                }}
              >
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
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-xl w-2/3">
          <div className="flex justify-center py-6 mb-3">
            <h2>💕입양 신청 중💕</h2>
          </div>
        </div>
      </div>
      <div className="header flex justify-center">
        <div className="w-2/3 notice_header rounded-xl mx-20 my-10 px-20">
          <div className=" pt-6 mb-3">
            <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
              <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                <span class="relative text-white">" 동물 정보 "</span>
              </span>
            </blockquote>
            <h2>동물 정보</h2>
            <h2>등록번호 : {assignData?.animal.animal_reg_num}</h2>
            <img src={assignData?.animal.image} alt="" />
            <h2>종류 : {assignData?.animal.category.name}</h2>
            <h2>사이즈 : {assignData?.animal.size}</h2>
            <h2>성별 : {assignData?.animal.sex}</h2>
            <h2>나이 : {assignData?.animal.age}세</h2>
            <h2>특징 : {assignData?.animal.info}</h2>
            <h2>보호 시작일 : {assignData?.animal.start_date}</h2>
            <h2>보호 종료일 : {assignData?.animal.end_date}</h2>
          </div>
        </div>
      </div>
      {auth.is_staff && <button onClick={() => handleDelete()}>삭제</button>}

      <button
        onClick={() => {
          auth.is_staff
            ? navigate(`/admin/assignmanage/`)
            : navigate(`/mypage/assigninfo/`);
        }}
      >
        목록
      </button>
    </>
  );
}
export default AssignDetail;
