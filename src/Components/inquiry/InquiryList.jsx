import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InquiryList() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const [{ data: inquiryList }, refetch] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/${query ? '?query=' + query : ''}`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
      console.log('ENTER');
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="header w-full h-screen">
        <div className="flex flex-wrap justify-center w-full">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-10">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-10">
              <div className="notice_header rounded-xl">
                <blockquote class="mt-5 text-3xl font-semibold italic text-center text-slate-900">
                  <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                    <span class="relative text-white">" 1:1 문의 "</span>
                  </span>
                </blockquote>

                <div className="ml-3 mb-3 mt-3">
                  <div className="text-right">
                    <input
                      type="text"
                      placeholder="검색어를 입력해주세요."
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="relative rounded p-3 text-sm  bg-gray-100 focus:outline-none focus:border focus:border-gray-400 md:w-1/2 px-3 md:mb-0"
                    />
                    <button
                      type="submit"
                      className="relative ml-2 mr-2 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 rounded"
                      onClick={() => refetch()}
                    >
                      검색
                    </button>
                  </div>
                </div>

                <div className="mb-5 shadow-md overflow-hidden border-b border-gray-200">
                  {inquiryList && (
                    <table className="mb-5 mr-5 border text-center min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-m font-bold text-gray-500 uppercase tracking-wider"
                          >
                            문의 번호
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-m font-bold text-gray-500 uppercase tracking-wider"
                          >
                            아이디
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-m font-bold text-gray-500 uppercase tracking-wider"
                          >
                            제목
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-m font-bold text-gray-500 uppercase tracking-wider"
                          >
                            문의 일자
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-m font-bold text-gray-500 uppercase tracking-wider"
                          >
                            답변 상태
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-red divide-y divide-gray-200">
                        {inquiryList?.map((inquiry) => (
                          <>
                            {(auth.userID === inquiry.user ||
                              auth.is_staff) && (
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {inquiry.inquiry_no}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {inquiry.user}
                                    </div>
                                  </div>
                                </td>

                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  onClick={() =>
                                    navigate(`/inquiry/${inquiry.inquiry_no}/`)
                                  }
                                >
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      <span className="px-2 inline-flex text-s leading-5 cursor-pointer font-semibold rounded-full bg-green-100 text-green-800">
                                        {inquiry.title}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {inquiry.created_at}
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex justify-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {/* <h2>{inquiry.status}</h2> */}
                                        {inquiry.admin_answer.length > 0 ? (
                                          <div className="bg-blue-300 text-xs">
                                            <img src="/check.png" width="17" />{' '}
                                            답변 완료
                                          </div>
                                        ) : (
                                          <div className="bg-gray-300 text-xs">
                                            <img
                                              src="/nocheck.png"
                                              width="15"
                                            />
                                            답변 대기
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
            <div className="flex place-content-between">
              <div></div>
              {auth.isLoggedIn && !auth.is_staff && (
                <button
                  onClick={() => navigate('/inquiry/new/')}
                  className="mx-10 text-white py-1 px-3 rounded-md bg-red-400 hover:bg-red-600 hover:shadow-lg font-medium"
                >
                  글쓰기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InquiryList;
