import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);

  const [{ data: assignData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div className="mb-20">
      <h2>입양신청 관리</h2>
      <input
        type="text"
        name="query"
        onChange={getQuery}
        onKeyPress={handleKeyPress}
        className="m-2 p-2 border-2 border-purple-400 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 w-1/2"
        placeholder="신청번호, 신청자명, 동물 등록번호, 회원 닉네임으로 검색 가능합니다."
      />
      <button onClick={() => refetch()}>검색</button>
      <table className="m-2">
        <thead>
          <tr>
            <th className="border-2 border-gray-400 p-2">신청 번호</th>
            <th className="border-2 border-gray-400 p-2">신청자명</th>
            <th className="border-2 border-gray-400 p-2">월 수입</th>
            <th className="border-2 border-gray-400 p-2">주거 형태</th>
            <th className="border-2 border-gray-400 p-2">신청한 동물 번호</th>
            <th className="border-2 border-gray-400 p-2">입양 희망 날짜</th>
            <th className="border-2 border-gray-400 p-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {assignData?.map((assign) => (
            <tr>
              <td
                className="border-2 border-gray-400 text-center cursor-pointer p-2"
                onClick={() =>
                  navigate(`/admin/assignmanage/${assign.assignment_no}/`)
                }
              >
                {assign.assignment_no}
              </td>
              <td
                className="border-2 border-gray-400 text-center cursor-pointer p-2"
                onClick={() =>
                  navigate(`/admin/usermanage/${assign.user.userID}/`)
                }
              >
                {assign.adopter_name}
              </td>
              <td className="border-2 border-gray-400 text-center p-2">
                {assign.monthly_income}
              </td>
              <td className="border-2 border-gray-400 text-center p-2">
                {assign.residential_type === '아파트' && '아파트'}
                {assign.residential_type === '빌라' && '빌라'}
                {assign.residential_type === '주택' && '주택'}
                {assign.residential_type === '원룸' && '원룸'}
                {assign.residential_type === '오피스텔' && '오피스텔'}
              </td>
              <td
                className="border-2 border-gray-400 text-center cursor-pointer p-2"
                onClick={() =>
                  navigate(`/admin/animal/${assign.animal.animal_no}/`)
                }
              >
                {assign.animal.animal_reg_num}
              </td>
              <td className="border-2 border-gray-400 text-center p-2">
                {assign.date_to_meet}
              </td>
              <td className="border-2 border-gray-400 text-center p-2">
                <h2>{assign.status}</h2>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignList;
