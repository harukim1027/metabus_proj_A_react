import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';

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
    <>
      <div className="header">
        <div className="justify-center mx-20 ">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md">
              <blockquote class="mt-5 text-4xl mb-3 font-semibold italic text-center text-slate-900">
                <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 relative inline-block">
                  <span class="relative text-white">" 내 입양신청 "</span>
                </span>
              </blockquote>

              <div className="mb-5 overflow-hidden border-b border-gray-200">
                <table className="mt-3 mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        신청 번호
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        신청 날짜
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        동물 번호
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase tracking-wider"
                      >
                        진행 상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {MyAssignData?.map((assign) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/assignment/${assign.assignment_no}/`}>
                            {assign.assignment_no}
                          </Link>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {assign.created_at}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/admin/animal/${assign.animal.animal_no}`}>
                            {assign.animal.animal_reg_num}
                          </Link>
                        </td>

                        <td
                          className={
                            assign.status === '입양 완료'
                              ? 'text-orange-300 font-bold px-6 py-4 whitespace-nowrap'
                              : 'px-6 py-4 whitespace-nowrap'
                          }
                        >
                          {assign.status}
                          {assign.status === '입양 완료' && (
                            <button
                              className="icon_size2 ml-6"
                              onClick={() => navigate('/review/new/')}
                            >
                              <img
                                className="transition transform hover:-translate-y-1"
                                src="/pen2.png"
                                alt="button"
                              ></img>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAssignInfo;
