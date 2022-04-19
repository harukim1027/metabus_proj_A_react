import { useApiAxios } from 'api/base';
import AssignmentForm from 'Components/Assignment/AssignmentForm';
import TopNav from 'Components/Main/TopNavi';
import { useNavigate } from 'react-router-dom';

function PageAssignmentform() {
  const navigate = useNavigate();
  return (
    <>
      <TopNav />
      <AssignmentForm
        handleDidSave={(savedPost) => {
          navigate(`/assignment/complite/${savedPost.assignment_no}/`);
        }}
      />
    </>
  );
}

export default PageAssignmentform;
