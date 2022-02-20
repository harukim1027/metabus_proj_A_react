// import Account from 'Components/accounts/Account';
import LoginForm from 'Components/accounts/LoginForm';
import TopNav from 'Components/Main/TopNavi';
import { ToastContainer, toast } from 'react-toastify';

function PageLoginForm() {
  return (
    <div>
      <TopNav />
      <ToastContainer />
      <LoginForm />
    </div>
  );
}

export default PageLoginForm;
