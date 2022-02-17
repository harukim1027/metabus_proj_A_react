import { useEffect } from 'react';
import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function MyInquiry() {
  const { auth } = useAuth();
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
    <>
      <div className="w-full h-screen bg-blue-100">
        <Sidebar />
        <div className="inline-block">
          {inquiryList && (
            <div className="flex space-x-1">
              {inquiryList
                .filter((a) => a.user === auth.userID)
                .map((inquiry) => (
                  <div
                    key={inquiry.inquiry_no}
                    className="mx-20 md:w-1/4 l:w-1/3 px-4 transition-transform hover:-translate-y-5 duration-300 "
                  >
                    <Link to={`/inquiry/${inquiry.inquiry_no}/`}>
                      <h2>{inquiry.title}</h2>
                      <h3>by: {inquiry.user}</h3>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default MyInquiry;
