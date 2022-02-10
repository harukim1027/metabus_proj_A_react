import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import Button from 'Button';

const INITIAL_FIELD_VALUES = { userID: '', password: '' };

function LoginForm() {
  const navigate = useNavigate();

  // const [auth, _, login] = useAuth();

  const { auth, login } = useAuth();
  const [{ loading, error }, requestToken] = useApiAxios(
    {
      url: `/accounts/api/token/`,
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const {
        access,
        refresh,
        userID,
        nickname,
        name,
        phone_number,
        email,
        region,
        password_quiz,
        password_quiz_answer,
        is_staff,
      } = response.data;
      // TODO: access/refresh token을 브라우저 어딘가에 저장해야 합니다.
      // 저장해서 페이지 새로고침이 발생하더라도 그 token이 유실되지 않아야 합니다.
      login({
        access,
        refresh,
        userID,
        nickname,
        name,
        phone_number,
        email,
        region,
        password_quiz,
        password_quiz_answer,
        is_staff,
      });

      console.log('access :', access);
      console.log('refresh :', refresh);
      console.log('userID :', userID);
      console.log('nickname :', nickname);
      console.log('name :', name);
      console.log('phone_number :', phone_number);
      console.log('email :', email);
      console.log('region :', region);
      console.log('password_quiz :', password_quiz);
      console.log('password_quiz_answer :', password_quiz_answer);
      console.log('is_staff :', is_staff);

      // 인증 후, 이동할 주소를 지정합니다.
      navigate('/');
    });
  };

  return (
    <div>
      <h2 className="py-3 text-center pb-3"> 🐹 Login </h2>
      <hr />

      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            name="userID"
            value={fieldValues.userID}
            onChange={handleFieldChange}
            placeholder="userID"
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
          />
        </div>
        <div className="my-3">
          <input
            type="password"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="password"
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
          />
        </div>
        <Button>로그인</Button>
      </form>
      <p className="py-3 pb-3" />
      <DebugStates auth={auth} fieldValues={fieldValues} />
    </div>
  );
}

export default LoginForm;
