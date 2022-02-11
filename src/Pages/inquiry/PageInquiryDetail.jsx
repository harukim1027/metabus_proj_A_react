import InquiryDetail from 'Components/inquiry/InquiryDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function PageInquiryDetail() {
  const { inquiryId } = useParams();
  return (
    <div>
      <TopNav />
      <InquiryDetail inquiryId={inquiryId} />
    </div>
  );
}
export default PageInquiryDetail;
