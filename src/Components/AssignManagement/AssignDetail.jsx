import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignStatus from './AssignStatus';
import '../../App.css';
import './AssignManagement.css';

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

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [assignData]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [assignData]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="assignmanagement_header rounded-xl shadow-md overflow-hidden md:px-20 sm:px-0 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block xs:text-2xl sm:text-4xl md:text-6xl">
              <span class="relative text-white">" 신청자 정보 "</span>
            </span>
          </blockquote>
          {/* 로딩 에러 */}
          {loading && (
            <>
              <p className="text-blue-400">&nbsp;&nbsp;로딩 중...</p>
            </>
          )}
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

          <div className="my-5 overflow-hidden">
            <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  신청 번호
                </th>
                <td>{assignData?.assignment_no}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  신청일
                </th>
                <td>{assignData?.created_at}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  신청시 기입한 이름
                </th>
                <td>{assignData?.adopter_name}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  회원명
                </th>
                <td>{assignData?.user.name}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  회원 연락처
                </th>
                <td>{assignData?.user.phone_number}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  회원 e-mail
                </th>
                <td>{assignData?.user.email}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  월 수입
                </th>
                <td>{assignData?.monthly_income}만</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  주거 형태
                </th>
                <td>{assignData?.residential_type}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  애완동물 유무
                </th>
                <td>{assignData?.have_pet_or_not ? '있음' : '없음'}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  만남 희망 장소
                </th>
                <td>{assignData?.place_to_meet}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  만남 희망일
                </th>
                <td>{assignData?.date_to_meet}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  진행 상태
                </th>
                <td
                  onClick={() => {
                    auth.is_staff && setClicked(!clicked);
                  }}
                >
                  {assignData?.status} (수정하려면 클릭)
                </td>
              </tr>
            </table>
            {clicked && assignData && (
              <div className="flex justify-center">
                <AssignStatus
                  assignId={assignId}
                  assignData={assignData}
                  handleDidSave={(savedPost) => {
                    savedPost && window.location.reload();
                    savedPost && setClicked(0);
                  }}
                />
              </div>
            )}
          </div>

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
        </div>
      </div>

      <div className="header flex flex-wrap justify-center">
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <div className="flex justify-center py-6 mb-3">
            <h2>💕입양 신청 중💕</h2>
          </div>
        </div>
      </div>

      <div className="header flex flex-wrap justify-center">
        <div className="assignmanagement_header rounded-xl shadow-md md:px-20 sm:px-0 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          {/* <div className=" pt-6 mb-3"> */}
          <blockquote className="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span className="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block xs:text-2xl sm:text-4xl md:text-6xl">
              <span className="relative text-white">" 동물 정보 "</span>
            </span>
          </blockquote>

          <div className="my-5 overflow-hidden">
            <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  등록번호
                </th>
                <td>{assignData?.animal.animal_reg_num}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  종류
                </th>
                <td>{assignData?.animal.category.name}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  사이즈
                </th>
                <td>{assignData?.animal.size}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  성별
                </th>
                <td>{assignData?.animal.sex}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  나이
                </th>
                <td>{assignData?.animal.age}세</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  동물 정보
                </th>
                <td>{assignData?.animal.info}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  보호 시작일
                </th>
                <td>{assignData?.animal.start_date}</td>
              </tr>

              <tr>
                <th className="border border-slate-200 bg-gray-50 px-6 py-3 text-center text-xl font-bold text-gray-500 tracking-wider w-72">
                  보호 종료일
                </th>
                <td>{assignData?.animal.end_date}</td>
              </tr>
            </table>
            <div className="flex justify-center">
              <img src={assignData?.animal.image} alt="" />
            </div>
          </div>

          <div className="my-5 text-right">
            {auth.is_staff && (
              <button
                onClick={() => handleDelete()}
                className="ml-3 flex-shrink-0 bg-purple-700 hover:bg-purple-900 border-purple-700 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded"
              >
                삭제
              </button>
            )}

            <button
              onClick={() => {
                auth.is_staff
                  ? navigate(`/admin/assignmanage/`)
                  : navigate(`/mypage/assigninfo/`);
              }}
              className="ml-3 flex-shrink-0 bg-purple-700 hover:bg-purple-900 border-purple-700 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded"
            >
              목록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignDetail;
