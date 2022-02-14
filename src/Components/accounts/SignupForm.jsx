import { useApiAxios } from 'api/base';
import Button from 'Button';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  userID: '',
  nickname: '',
  name: '',
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

  // 회원가입 폼 생성을 위한 api 데이터 post 요청
  const [{ loading, error, errorMessages }, requestToken] = useApiAxios(
    {
      url: `/accounts/api/signup/`,
      method: 'POST', // postman에서 signup을 생성했음
    },
    { manual: true },
  );

  // 중복입력 대조를 위한 api 데이터 get 요청
  const [{ data: userList }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );
  useEffect(() => {
    refetch();
  }, [userList]);

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('회원가입 하시겠습니까?')) {
      requestToken({ data: fieldValues }).then(() => {
        // 인증 후, 이동할 주소를 지정합니다.
        navigate('/accounts/login/');
      });
    }
  };

  // 중복값 대조를 위한 상탯값 지정
  const [nameValue, setNameValue] = useState({ userID: '', nickname: '' });
  const clickButton = (e) => {
    e.preventDefault(); //form 안에 submit 역할을 하는 버튼을 눌렀어도 실행하지 않도록 막음
    setNameValue({
      userID: fieldValues.userID,
      nickname: fieldValues.nickname,
    });
  };

  return (
    <div>
      <h2 className="py-3 text-center pb-3"> 🐰 Sign Up</h2>
      <hr />
      {error?.response?.status === 401 && (
        <div className="text-red-400">회원가입에 실패했습니다.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="ml-4 my-3 pb-2 text">
          <span className="font-extrabold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m text-slate-700">
            사용자 ID{' '}
          </span>
          <input
            type="text"
            name="userID"
            value={fieldValues.userID}
            onChange={handleFieldChange}
            placeholder="사용자 ID를 입력해주세요."
            className="w-300 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 text-sm"
          />
          {/* preventDefault를 위한 e 이벤트 객체 지정  */}
          <Button onClick={(e) => clickButton(e)}>중복확인</Button>
          {userList &&
            userList.filter((user) => user.userID === nameValue.userID).length >
              0 && (
              <p className="text-m text-red-400">
                동일한 아이디가 존재합니다. 다른 아이디를 입력해주세요.
              </p>
            )}
          {errorMessages.userID?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="ml-4 my-3 pb-2">
          <span className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            닉네임{' '}
          </span>
          <input
            type="text"
            name="nickname"
            value={fieldValues.nickname}
            onChange={handleFieldChange}
            placeholder="사용하실 닉네임을 입력해주세요."
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400  text-sm"
          />
          {/* preventDefault를 위한 e 이벤트 객체 지정  */}
          <Button onClick={(e) => clickButton(e)}>중복확인</Button>
          {userList &&
            userList.filter((user) => user.nickname === nameValue.nickname)
              .length > 0 && (
              <p className="text-m text-red-400">
                동일한 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.
              </p>
            )}
          {errorMessages.nickname?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="ml-4 my-3 pb-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            사용자 이름{' '}
          </span>
          <input
            type="text"
            name="name"
            value={fieldValues.name}
            onChange={handleFieldChange}
            placeholder="사용자 이름을 입력해주세요."
            className="mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm "
          />
          {errorMessages.name?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="ml-4 my-3 pb-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            연락처{' '}
          </span>
          <input
            type="text"
            name="phone_number"
            value={fieldValues.phone_number}
            onChange={handleFieldChange}
            placeholder="입력형식 예) 010-0000-0000"
            className="mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full  text-sm"
          />
          {errorMessages.phone_number?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="ml-4 my-3 pb-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            이메일{' '}
          </span>
          <input
            type="text"
            name="email"
            value={fieldValues.email}
            onChange={handleFieldChange}
            placeholder="입력형식 예 ) user@email.com"
            className="mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full  text-sm"
          />
          {errorMessages.email?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="ml-4 inline-block relative w-64 pb-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            거주지역{' '}
          </span>
          <select
            name="region"
            value={fieldValues.region}
            onChange={handleFieldChange}
            className="my-3 uppercase tracking-wide text-gray-700 text-m font-bold mb-3 overflow-scroll flex focus:border-gray-400 "
          >
            <option value="1">Seoul</option>
            <option value="2">Busan</option>
            <option value="3">Daegu</option>
            <option value="4">Incheon</option>
            <option value="5">Daejeon</option>
            <option value="6">Sejong</option>
            <option value="7">Gwangju</option>
            <option value="8">Ulsan</option>
            <option value="9">Jeju</option>
            <option value="10">Gangwon</option>
          </select>
          {errorMessages.region?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="ml-4 inline-block relative w-64 pb-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            비밀번호 퀴즈{' '}
          </span>
          <select
            name="password_quiz"
            value={fieldValues.password_quiz}
            onChange={handleFieldChange}
            className="focus:border-gray-400 my-3 uppercase tracking-wide text-gray-700 text-m font-bold mb-3 overflow-scroll flex "
          >
            <option value="1">내 보물 1호는?</option>
            <option value="2">처음 키운 반려동물 이름은?</option>
            <option value="3">어머니 성함은?</option>
            <option value="4">아버지 성함은?</option>
            <option value="5">좋아하는 음식은?</option>
          </select>
          {errorMessages.password_quiz?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="ml-4 my-3 pb-2">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            비밀번호 퀴즈 정답{' '}
          </span>
          <input
            type="text"
            name="password_quiz_answer"
            value={fieldValues.password_quiz_answer}
            onChange={handleFieldChange}
            placeholder="퀴즈 정답을 입력해주세요."
            className="mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
          />
          <h5 className="text-xs text-blue-400">
            이 퀴즈의 정답은 비밀번호 찾기 시에 사용됩니다.
          </h5>
          {errorMessages.password_quiz_answer?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="ml-4 my-3 py-3">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            비밀번호{' '}
          </span>
          <input
            type="password"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="비밀번호를 입력해주세요."
            className="mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
          />
          {errorMessages.password?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <hr />
        <div className="ml-4 my-3 py-3">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
            비밀번호 확인{' '}
          </span>
          <input
            type="password"
            name="password2"
            value={fieldValues.password2}
            onChange={handleFieldChange}
            placeholder="비밀번호를 다시 입력해주세요."
            className="mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
          />
          {errorMessages.password2?.map((message, index) => (
            <p key={index} className="text-m text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div className="my-3 py-3 text-center">
          <Button>회원가입</Button>
        </div>
      </form>
      <hr />

      <DebugStates fieldValues={fieldValues} non_field_errors={errorMessages} />
    </div>
  );
}

export default SignupForm;
