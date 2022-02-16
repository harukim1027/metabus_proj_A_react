import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserAssignList() {
  const { auth } = useAuth();
  const { userId } = useParams();

  const [{ data: AssignStatusData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/?query=${userId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h2>입양신청 현황 페이지</h2>
      <table className="border-2">
        <thead className="border-2">
          <tr>
            <th className="border-2">번호</th>
            <th className="border-2">등록번호</th>
            <th className="border-2">신청날짜</th>
            <th className="border-2">진행상태</th>
          </tr>
        </thead>
        <tbody>
          {AssignStatusData?.map((assign) => (
            <tr>
              <td>
                <Link to={`/admin/assignmanage/${assign.assignment_no}/`}>
                  {assign.assignment_no}
                </Link>
              </td>

              <td>
                <Link to={`/admin/animal/${assign.animal.animal_no}`}>
                  {assign.animal.animal_reg_num}
                </Link>
              </td>

              <td>{assign.created_at}</td>

              <td>
                {assign.status === '신청' && '신청'}
                {assign.status === '심사 중' && '심사 중'}
                {assign.status === '수락' && '수락'}
                {assign.status === '교육 중' && '교육 중'}
                {assign.status === '입양 완료' && '입양 완료'}
                {assign.status === '거절' && '거절'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAssignList;
