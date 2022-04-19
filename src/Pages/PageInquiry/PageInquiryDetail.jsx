import InquiryDetail from 'Components/inquiry/InquiryDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import Sidebar from 'Components/Mypage/Sidebar';

function PageInquiryDetail() {
  const { auth } = useAuth();
  const { inquiryId } = useParams();
  return (
    <>
      <div>
        <TopNav />

        {(!auth.is_staff && (
          <div>
            <div>
              <Sidebar />
            </div>
            <div>
              <InquiryDetail inquiryId={inquiryId} />
            </div>
          </div>
        )) ||
          (auth.is_staff && <InquiryDetail inquiryId={inquiryId} />)}
      </div>
    </>
  );
}
export default PageInquiryDetail;
