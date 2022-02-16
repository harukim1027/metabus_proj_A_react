import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignList() {
  const navigate = useNavigate();

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
    <div className="mb-20">
      <h2>입양신청 관리</h2>
      <table>
        <thead>
          <tr>
            <th className="border-2 border-gray-400">신청 번호</th>
            <th className="border-2 border-gray-400">신청자명</th>
            <th className="border-2 border-gray-400">월 수입</th>
            <th className="border-2 border-gray-400">주거 형태</th>
            <th className="border-2 border-gray-400">신청한 동물 번호</th>
            <th className="border-2 border-gray-400">입양 희망 날짜</th>
            <th className="border-2 border-gray-400">상태</th>
          </tr>
        </thead>
        <tbody>
          {assignData?.map((assign) => (
            <tr className="">
              <td
                className="border-2 border-gray-400 text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/assignmanage/${assign.assignment_no}/`)
                }
              >
                {assign.assignment_no}
              </td>
              <td
                className="border-2 border-gray-400 text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/usermanage/${assign.user.userID}/`)
                }
              >
                {assign.adopter_name}
              </td>
              <td className="border-2 border-gray-400 text-center">
                {assign.monthly_income}
              </td>
              <td className="border-2 border-gray-400 text-center">
                {assign.residential_type === '아파트' && '아파트'}
                {assign.residential_type === '빌라' && '빌라'}
                {assign.residential_type === '주택' && '주택'}
                {assign.residential_type === '원룸' && '원룸'}
                {assign.residential_type === '오피스텔' && '오피스텔'}
              </td>
              <td
                className="border-2 border-gray-400 text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/animal/${assign.animal.animal_no}/`)
                }
              >
                {assign.animal.animal_reg_num}
              </td>
              <td className="border-2 border-gray-400 text-center">
                {assign.date_to_meet}
              </td>
              <td className="border-2 border-gray-400 text-center">
                {assign.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignList;
