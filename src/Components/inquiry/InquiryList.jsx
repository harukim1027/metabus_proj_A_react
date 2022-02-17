import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import Sidebar from 'Components/Mypage/Sidebar';
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
      <div className="w-full h-screen bg-blue-100">
        <Sidebar />
        <div className="inline-block">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" onClick={() => refetch()}>
            검색
          </button>

          <table className="m-2">
            <thead>
              <tr>
                <th className="border-2 border-gray-400 p-2">문의 번호</th>
                <th className="border-2 border-gray-400 p-2">아이디</th>
                <th className="border-2 border-gray-400 p-2">제목</th>
                <th className="border-2 border-gray-400 p-2">문의 일자</th>
                <th className="border-2 border-gray-400 p-2">답변 상태</th>
              </tr>
            </thead>
            {inquiryList && (
              <tbody>
                {inquiryList?.map((inquiry) => (
                  <>
                    {(auth.userID === inquiry.user || auth.is_staff) && (
                      <tr>
                        <td
                          className="border-2 border-gray-400 text-center cursor-pointer p-2"
                          onClick={() =>
                            navigate(`/inquiry/${inquiry.inquiry_no}/`)
                          }
                        >
                          {inquiry.inquiry_no}
                        </td>
                        <td className="border-2 border-gray-400 text-center p-2">
                          {inquiry.user}
                        </td>
                        <td
                          className="border-2 border-gray-400 text-center cursor-pointer p-2"
                          onClick={() =>
                            navigate(`/inquiry/${inquiry.inquiry_no}/`)
                          }
                        >
                          {inquiry.title}
                        </td>
                        <td className="border-2 border-gray-400 text-center p-2">
                          {inquiry.created_at}
                        </td>

                        <td className="border-2 border-gray-400 text-center p-2">
                          <div className="flex justify-center">
                            {/* <h2>{inquiry.status}</h2> */}
                            {inquiry.admin_answer.length > 0 ? (
                              <img src="/check.png" width="17" />
                            ) : (
                              <img src="/nocheck.png" width="17" />
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
export default InquiryList;
