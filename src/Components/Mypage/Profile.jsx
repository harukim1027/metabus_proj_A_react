import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ReviewList from 'Components/review/ReviewList';

function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Route path="/accounts/profile/" component={ReviewList} />
      {/* <Route path="/members" component={Members} /> */}
      {/* <Route path="/cashes" component={Cashes} /> */}
    </>
  );
}

export default Profile;
