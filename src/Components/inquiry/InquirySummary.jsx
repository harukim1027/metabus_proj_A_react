import { Link } from 'react-router-dom';

function InquirySummary({ inquiry }) {
  return (
    <Link to={`/inquiry/${inquiry.inquiry_no}/`}>
      <div>
        <h1>{inquiry.title}</h1>
        <h2>by: {inquiry.user}</h2>
      </div>
    </Link>
  );
}
export default InquirySummary;
