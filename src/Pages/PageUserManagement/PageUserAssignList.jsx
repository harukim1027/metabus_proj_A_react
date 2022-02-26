import TopNav from 'Components/Main/TopNavi';
import UserAssignList from 'Components/UserManagement/UserAssignList';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import { useParams } from 'react-router-dom';

function PageUserAssignList() {
  const { userId } = useParams();

  return (
    <>
      <TopNav />
      <div className="flex">
        <div className="flex-none">
          <UserManageSidebar userId={userId} />
        </div>
        <div className="flex-1">
          <UserAssignList userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserAssignList;
