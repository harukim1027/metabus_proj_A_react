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
    <>
      <h2>입양신청 관리</h2>
      <table>
        <thead>
          <tr>
            <th className="border-2 border-gray-400">신청 번호</th>
            <th className="border-2 border-gray-400">신청자명</th>
            <th className="border-2 border-gray-400">월 수입</th>
            <th className="border-2 border-gray-400">주거 형태</th>
            <th className="border-2 border-gray-400">신청한 동물 번호</th>
          </tr>
        </thead>
        <tbody>
          {assignData?.map((assign) => (
            <tr className="cursor-pointer">
              <td
                className="border-2 border-gray-400"
                onClick={() =>
                  navigate(`/admin/assignmanage/${assign.assignment_no}/`)
                }
              >
                {assign.assignment_no}
              </td>
              <td
                className="border-2 border-gray-400"
                onClick={() =>
                  navigate(`/admin/usermanage/${assign.user.userID}/`)
                }
              >
                {assign.adopter_name}
              </td>
              <td className="border-2 border-gray-400">
                {assign.monthly_income}
              </td>
              <td className="border-2 border-gray-400">
                {assign.residential_type === 'Apartment' && '아파트'}
                {assign.residential_type === 'Villa' && '빌라'}
                {assign.residential_type === 'Housing' && '주택'}
                {assign.residential_type === 'Oneroom' && '원룸'}
                {assign.residential_type === 'Officetel' && '오피스텔'}
              </td>
              <td className="border-2 border-gray-400">
                {assign.animal.animal_reg_num}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AssignList;
