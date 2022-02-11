import AssignmentList from 'Components/Assignment/AssignmentList';
import TopNav from 'Components/Main/TopNavi';

function PageAssignmentList() {
  return (
    <>
      <TopNav />
      <h2>입양 신청 리스트 페이지</h2>
      <AssignmentList />
    </>
  );
}

export default PageAssignmentList;
