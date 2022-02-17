import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import InquirySummary from './InquirySummary';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import Sidebar from 'Components/Mypage/Sidebar';

function InquiryList() {
  const { auth } = useAuth();
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
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button type="submit" onClick={() => refetch()}>
          검색
        </button>
        <div className="inline-block">
          {inquiryList && (
            <div className="flex space-x-1">
              {inquiryList.map((inquiry) => (
                <div key={inquiry.inquiry_no}>
                  {auth.userID === inquiry.user && (
                    <InquirySummary inquiry={inquiry} />
                  )}
                  {auth.is_staff && <InquirySummary inquiry={inquiry} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default InquiryList;
