import { Link } from 'react-router-dom';

function InquirySummary({ inquiry }) {
  return (
    <div>
      <Link to={`/inquiry/${inquiry.inquiry_no}/`}>{inquiry.title}</Link>
    </div>
  );
}
export default InquirySummary;
