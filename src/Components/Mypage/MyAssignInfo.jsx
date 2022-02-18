import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MyAssignInfo() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: MyAssignData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/?query=${auth.userID}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="inline-block">
        <h2>마이페이지 입양신청 현황</h2>
        <table className="border-2">
          <thead>
            <tr>
              <th className="border-2">신청 번호</th>
              <th className="border-2">신청 날짜</th>
              <th className="border-2">동물 번호</th>
              <th className="border-2">진행 상태</th>
            </tr>
          </thead>
          <tbody>
            {MyAssignData?.map((assign) => (
              <tr>
                <td>
                  <Link to={`/assignment/${assign.assignment_no}/`}>
                    {assign.assignment_no}
                  </Link>
                </td>

                <td>{assign.created_at}</td>

                <td>
                  <Link to={`/admin/animal/${assign.animal.animal_no}`}>
                    {assign.animal.animal_reg_num}
                  </Link>
                </td>

                <td>
                  {assign.status}
                  {assign.status === '입양 완료' && (
                    <button
                      className="ml-3"
                      onClick={() => navigate('/review/new/')}
                    >
                      후기 작성
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAssignInfo;
