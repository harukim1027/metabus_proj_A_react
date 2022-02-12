import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import InquirySummary from './InquirySummary';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

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
              {auth.userID === inquiry.user && (
                <InquirySummary inquiry={inquiry} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default InquiryList;
