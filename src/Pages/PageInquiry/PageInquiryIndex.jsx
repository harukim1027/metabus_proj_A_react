import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';

function PageInquiryIndex() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  return (
    <div>
      <TopNav />
      <InquiryList />
      {auth.isLoggedIn && !auth.is_staff && (
        <button onClick={() => navigate('/inquiry/new/')}>글쓰기</button>
      )}
    </div>
  );
}

export default PageInquiryIndex;
