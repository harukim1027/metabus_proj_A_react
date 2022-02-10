import { useNavigate } from 'react-router-dom';
import InquiryList from 'Components/inquiry/InquiryList';
import TopNav from 'Components/Main/TopNavi';

function PageInquiryIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <TopNav />
      <h2>1:1 문의</h2>
      <InquiryList />
      <button onClick={() => navigate('/inquiry/new/')}>글쓰기</button>
    </div>
  );
}

export default PageInquiryIndex;
