import AssignmentForm from 'Components/Assignment/AssignmentForm';
import TopNav from 'Components/Main/TopNavi';
import { useNavigate } from 'react-router-dom';

function PageAssignmentform() {
  const navigate = useNavigate();
  return (
    <>
      <TopNav />
      <h2>입양 신청 페이지</h2>
      <AssignmentForm
        handleDidSave={(savedAssign) => navigate(`/assigncomp/complite/`)}
      />
    </>
  );
}

export default PageAssignmentform;
