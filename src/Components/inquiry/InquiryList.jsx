import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import InquirySummary from './InquirySummary';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function InquiryList() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [{ data: inquiryList }, refetch] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="my-5 ">
      {inquiryList && (
        <div className="flex space-x-1">
          {inquiryList.map((inquiry) => (
            <div key={inquiry.inquiry_no}>
              <InquirySummary inquiry={inquiry} />
            </div>
          ))}
        </div>
      )}
      {!auth.is_staff && (
        <button onClick={() => navigate('/inquiry/new/')}>문의 작성</button>
      )}
    </div>
  );
}
export default InquiryList;
