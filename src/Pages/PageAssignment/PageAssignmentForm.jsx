import { useApiAxios } from 'api/base';
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
        handleDidSave={(savedPost) => {
          navigate(`/adoptassignment/complite/${savedPost.assignment_no}/`);
        }}
      />
    </>
  );
}

export default PageAssignmentform;
