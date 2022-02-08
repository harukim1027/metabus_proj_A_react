import { useApiAxios } from 'api/base';
import Button from 'Button';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INITIAL_FIELD_VALUES = {
  userID: '',
  nickname: '',
  username: '',
  phone_number: '',
  email: '',
  region: '',
  password_quiz: '',
  password_quiz_answer: '',
  password: '',
  password2: '',
};

function SignupForm() {
  const navigate = useNavigate();

  const auth = useAuth();
  const [{ loading, error, errorMessages }, requestToken] = useApiAxios(
    {
      url: '/accounts/api/signup/', // postman에서 signup을 생성했음
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('회원가입 하시겠습니까?')) {
      requestToken({ data: fieldValues }).then(() => {
        // 인증 후, 이동할 주소를 지정합니다.
        navigate('/');
      });
    }
  };

  return (
    <div>
      <h2 className="text-center pb-3"> 🐰 Sign Up</h2>
      <hr />
      {error?.response?.status === 401 && (
        <div className="text-red-400">회원가입에 실패했습니다.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="my-3 pb-2">
          <label>
            사용자 ID
            <input
              type="text"
              name="userID"
              value={fieldValues.userID}
              onChange={handleFieldChange}
              placeholder="사용자 ID를 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.userID?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 pb-2">
          <label>
            닉네임
            <input
              type="text"
              name="nickname"
              value={fieldValues.nickname}
              onChange={handleFieldChange}
              placeholder="사용하실 닉네임을 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.nickname?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 pb-2">
          <label>
            사용자 이름
            <input
              type="text"
              name="username"
              value={fieldValues.username}
              onChange={handleFieldChange}
              placeholder="사용자 이름을 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.username?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 pb-2">
          <label>
            연락처
            <input
              type="text"
              name="phone_number"
              value={fieldValues.phone_number}
              onChange={handleFieldChange}
              placeholder="연락처를 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.phone_number?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 pb-2">
          <label>
            이메일
            <input
              type="text"
              name="email"
              value={fieldValues.email}
              onChange={handleFieldChange}
              placeholder="입력형식 예 ) user@email.com"
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.email?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>

        <div className="inline-block relative w-64 pb-2">
          <label>
            거주지역
            <select
              name="region"
              value={fieldValues.region}
              onChange={handleFieldChange}
              className="my-3 uppercase tracking-wide text-gray-700 text-m font-bold mb-3 overflow-scroll flex "
            >
              <option>Seoul</option>
              <option>Busan</option>
              <option>Daegu</option>
              <option>Incheon</option>
              <option>Sejong</option>
              <option>Gwangju</option>
              <option>Ulsan</option>
              <option>Jeju</option>
              <option>Gangwon</option>
            </select>
            {errorMessages.region?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="inline-block relative w-64 pb-2">
          <label>
            비밀번호 퀴즈
            <select
              name="password_quiz"
              value={fieldValues.password_quiz}
              onChange={handleFieldChange}
              className="my-3 uppercase tracking-wide text-gray-700 text-m font-bold mb-3 overflow-scroll flex "
            >
              <option>내 보물 1호는?</option>
              <option>처음 키운 반려동물 이름은?</option>
              <option>어머니 성함은?</option>
              <option>아버지 성함은?</option>
              <option>좋아하는 음식은?</option>
            </select>
            {errorMessages.password_quiz?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 pb-2">
          <label>
            비밀번호 퀴즈 정답
            <input
              type="text"
              name="password_quiz_answer"
              value={fieldValues.password_quiz_answer}
              onChange={handleFieldChange}
              placeholder="퀴즈 정답을 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            <h5 className="text-xs text-blue-400">
              이 퀴즈의 정답은 비밀번호 찾기 시에 사용됩니다.
            </h5>
            {errorMessages.phone_number?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>

        <div className="my-3 py-3">
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={fieldValues.password}
              onChange={handleFieldChange}
              placeholder="비밀번호를 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.password?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <hr />
        <div className="my-3 py-3">
          <label>
            비밀번호 확인
            <input
              type="password"
              name="password2"
              value={fieldValues.password2}
              onChange={handleFieldChange}
              placeholder="비밀번호를 다시 입력해주세요."
              className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
            />
            {errorMessages.password2?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </label>
        </div>
        <div className="my-3 py-3 text-center">
          <Button>회원가입</Button>
        </div>
      </form>
      <hr />
      <DebugStates
        auth={auth}
        fieldValues={fieldValues}
        non_field_errors={errorMessages}
      />
    </div>
  );
}

export default SignupForm;
