import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function InquirySummary({ inquiry }) {
  return (
    <div>
      <h1>{inquiry.inquiry_no}</h1>
      <h2>비밀글입니다.</h2>
    </div>
  );
}
export default InquirySummary;
