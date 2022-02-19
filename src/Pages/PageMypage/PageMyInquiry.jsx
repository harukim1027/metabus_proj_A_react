import TopNav from 'Components/Main/TopNavi';
import Sidebar from 'Components/Mypage/Sidebar';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';

function PageMyInquiry() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <TopNav />
      <div className="flex">
        <div className="flex-none">
          <Sidebar />
        </div>
        <div className="flex-1">
          <InquiryList />
        </div>
      </div>
    </>
  );
}

export default PageMyInquiry;
