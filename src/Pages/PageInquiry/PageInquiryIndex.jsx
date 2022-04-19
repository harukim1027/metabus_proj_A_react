import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';

function PageInquiryIndex() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  return (
    <div className="header">
      <TopNav />
      <InquiryList />
    </div>
  );
}

export default PageInquiryIndex;
