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
      <div>
        <Sidebar />
        <div>
          <InquiryList />
        </div>
      </div>
    </>
  );
}

export default PageMyInquiry;
