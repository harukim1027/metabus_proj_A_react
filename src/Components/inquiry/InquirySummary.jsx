import { Link } from 'react-router-dom';

function InquirySummary({ inquiry }) {
  return (
    <div>
      <Link to={`/inquiry/${inquiry.inquiry_no}/`}>
        <h1>{inquiry.inquiry_no}</h1>
        <h2>{inquiry.title}</h2>
      </Link>
    </div>
  );
}
export default InquirySummary;
