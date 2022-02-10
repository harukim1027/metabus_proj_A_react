import { useNavigate, useParams } from 'react-router-dom';
import TopNav from 'Components/Main/TopNavi';
import InquiryForm from 'Components/inquiry/InquiryForm';

function PageInquiryForm() {
  const navigate = useNavigate();
  const { inquiryId } = useParams();

  return (
    <>
      <TopNav />
      <InquiryForm
        inquiryId={inquiryId}
        handleDidSave={(savedPost) =>
          navigate(`/inquiry/${savedPost.inquiry_no}/`)
        }
      />
    </>
  );
}
export default PageInquiryForm;
