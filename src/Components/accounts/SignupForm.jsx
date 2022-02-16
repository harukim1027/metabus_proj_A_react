import { useApiAxios } from 'api/base';
import Button from 'Button';

import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './accounts.css';
import Captcha from './Captcha';

const INIT_FIELD_VALUES = {
  userID: '',
  nickname: '',
  name: '',
  phone_number: '',
  email: '',
  region: 1,
  password_quiz: '내 보물 1호는?',
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
  }, []);

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
  console.log(nameValue);

  return (
    <>
      <div className="header">
        <div className="justify-center shadow-md rounded px-20 pt-6 pb-8 mb-4">
          <div className=" flex flex-wrap justify-center w-full max-w-m">
            <hr className="mb-3" />
            {error?.response?.status === 401 && (
              <div className="text-red-400">회원가입에 실패했습니다.</div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md  rounded px-20 pt-6 pb-8 mb-4"
            >
              <h2 className="text-m mb-3 flex justify-center py-3 text-center pb-3 ">
                {' '}
                🐰 Sign Up
              </h2>
              <div className="ml-3 -mx-3 mb-6">
                <div className="ml-3 w-full">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                    사용자 ID{' '}
                  </span>
                  <input
                    type="text"
                    name="userID"
                    value={fieldValues.userID}
                    onChange={handleFieldChange}
                    placeholder="사용자 ID를 입력해주세요."
                    className="rounded p-3 text-sm  bg-gray-100 focus:outline-none focus:border focus:border-gray-400  w-full md:w-1/2 px-3 mb-6 md:mb-0"
                  />
                  {/* preventDefault를 위한 e 이벤트 객체 지정  */}
                  <button
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    readOnly
                    onClick={(e) => clickButton(e)}
                  >
                    중복확인
                  </button>
                  {nameValue.userID !== '' &&
                    userList &&
                    userList.filter((user) => user.userID === nameValue.userID)
                      .length > 0 && (
                      <p className="text-m text-red-400">
                        동일한 아이디가 존재합니다. 다른 아이디를 입력해주세요.
                      </p>
                    )}
                  {nameValue.userID !== '' &&
                    userList &&
                    userList.filter((user) => user.userID === nameValue.userID)
                      .length === 0 && (
                      <h2 className="text-m text-green-400">
                        사용가능한 아이디입니다.
                      </h2>
                    )}
                  {errorMessages.userID?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-3 flex flex-wrap -mx-3 mb-6 ">
                <div className="ml-3 w-full">
                  <span className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    닉네임{' '}
                  </span>
                  <input
                    type="text"
                    name="nickname"
                    value={fieldValues.nickname}
                    onChange={handleFieldChange}
                    placeholder="사용하실 닉네임을 입력해주세요."
                    className="rounded p-3 bg-gray-100 focus:outline-none focus:border text-sm focus:border-gray-400 w-full md:w-1/2 px-3 mb-6 md:mb-0"
                  />
                  {/* preventDefault를 위한 e 이벤트 객체 지정  */}
                  <button
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    onClick={(e) => clickButton(e)}
                    readOnly
                  >
                    중복확인
                  </button>
                  {nameValue.nickname !== '' &&
                    userList &&
                    userList.filter(
                      (user) => user.nickname === nameValue.nickname,
                    ).length > 0 && (
                      <p className="text-m text-red-400">
                        동일한 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.
                      </p>
                    )}
                  {nameValue.nickname !== '' &&
                    userList &&
                    userList.filter(
                      (user) => user.nickname === nameValue.nickname,
                    ).length === 0 && (
                      <p className="text-m text-green-400">
                        사용가능한 닉네임입니다.
                      </p>
                    )}
                  {errorMessages.nickname?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700 pb-2">
                    사용자 이름{' '}
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={fieldValues.name}
                    onChange={handleFieldChange}
                    placeholder="사용자 이름을 입력해주세요."
                    className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
                  />
                  {errorMessages.name?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700 pb-2">
                    연락처{' '}
                  </span>
                  <input
                    type="text"
                    name="phone_number"
                    value={fieldValues.phone_number}
                    onChange={handleFieldChange}
                    placeholder="입력형식 예) 010-0000-0000"
                    className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
                  />
                  {errorMessages.phone_number?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    이메일{' '}
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={fieldValues.email}
                    onChange={handleFieldChange}
                    placeholder="입력형식 예 ) user@email.com"
                    className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
                  />
                  {errorMessages.email?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="ml-4 inline-block relative w-64 pb-2">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    거주지역{' '}
                  </span>
                  <div className="relative">
                    <select
                      name="region"
                      value={fieldValues.region}
                      onChange={handleFieldChange}
                      className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="서울">서울</option>
                      <option value="인천">인천</option>
                      <option value="대전">대전</option>
                      <option value="세종">세종</option>
                      <option value="대구">대구</option>
                      <option value="부산">부산</option>
                      <option value="광주">광주</option>
                      <option value="울산">울산</option>
                      <option value="제주">제주</option>
                      <option value="강원">강원</option>
                    </select>

                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  {errorMessages.region?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
              <div className="ml-3 flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    비밀번호 퀴즈{' '}
                  </span>
                  <div className="relative">
                    <select
                      name="password_quiz"
                      value={fieldValues.password_quiz}
                      onChange={handleFieldChange}
                      className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="내 보물 1호는?">내 보물 1호는?</option>
                      <option value="처음 키운 반려동물 이름은?">
                        처음 키운 반려동물 이름은?
                      </option>
                      <option value="어머니 성함은?">어머니 성함은?</option>
                      <option value="아버지 성함은?">아버지 성함은?</option>
                      <option value="좋아하는 음식은?">좋아하는 음식은?</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>

                  {errorMessages.password_quiz?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    비밀번호 퀴즈 정답{' '}
                  </span>
                  <input
                    type="text"
                    name="password_quiz_answer"
                    value={fieldValues.password_quiz_answer}
                    onChange={handleFieldChange}
                    placeholder="퀴즈 정답을 입력해주세요."
                    className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
                  />

                  {errorMessages.password_quiz_answer?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
                <h5 className="ml-5 text-xs mb-3 text-blue-400">
                  이 퀴즈의 정답은 비밀번호 찾기 시에 사용됩니다.
                </h5>
              </div>
              <div className="ml-4 flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    비밀번호{' '}
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={fieldValues.password}
                    onChange={handleFieldChange}
                    placeholder="******************"
                    className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
                  />
                  {errorMessages.password?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
              </div>

              <hr className="mb-3" />
              <div className="ml-3 flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block text-m font-extrabold text-slate-700">
                    비밀번호 확인{' '}
                  </span>
                  <input
                    type="password"
                    name="password2"
                    value={fieldValues.password2}
                    onChange={handleFieldChange}
                    placeholder="******************"
                    className="rounded mb-2 p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full text-sm"
                  />
                  {errorMessages.password2?.map((message, index) => (
                    <p key={index} className="text-m text-red-400">
                      {message}
                    </p>
                  ))}
                </div>
                <h5 className="ml-5 text-xs mb-3 text-blue-400">
                  입력하신 비밀번호를 다시 입력해주세요 !
                </h5>
              </div>
              <div className="flex justify-center">
                <Captcha />
              </div>

              <div className="my-3 py-3 text-center">
                <Button>회원가입</Button>
              </div>
            </form>
          </div>
          <p class="flex flex-wrap justify-center text-center text-gray-500 text-xs">
            &copy;2022 METABUS Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
