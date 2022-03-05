import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../App.css';
import './accounts.css';

const INIT_FIELD_VALUES = {
  userID: '',
  nickname: '',
  name: '',
  phone_number: '',
  email: '',
  region: '서울',
  password_quiz: '내 보물 1호는?',
  password_quiz_answer: '',
  password: '',
  password2: '',
};

function SignupForm() {
  const navigate = useNavigate();

  // 회원가입 폼 생성을 위한 api 데이터 post 요청 -> 버튼 밑에 위치
  const [{ loading, error, errorMessages }, requestToken] = useApiAxios(
    {
      url: `/accounts/api/signup/`,
      method: 'POST', // postman에서 signup을 생성했음
    },
    { manual: true },
  );

  // 중복입력 대조를 위한 api 데이터 get 요청 -> 상단에 로딩 위치
  const [{ data: userList }, refetch] = useApiAxios(
    {
      url: `/accounts/api/usersnotpaging/`,
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
        toast.success('회원가입 완료! 로그인해주세요.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  // 중복값 대조를 위한 상탯값 지정
  const [nameValue, setNameValue] = useState({
    userID: '',
    nickname: '',
    email: '',
  });
  const clickButton = (e) => {
    e.preventDefault(); //form 안에 submit 역할을 하는 버튼을 눌렀어도 실행하지 않도록 막음
    setNameValue({
      userID: fieldValues.userID,
      nickname: fieldValues.nickname,
      email: fieldValues.email,
    });
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, []);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 notice_header rounded-xl shadow-md overflow-hidden sm:px-20 pt-5 pb-10 my-10 lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-3 font-semibold italic text-center text-slate-900">
            <span class="mt-7 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-900 relative inline-block">
              <span class="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl relative text-white">
                " 회원가입 "
              </span>
            </span>
          </blockquote>
          <hr />

          <div className="flex justify-center items-stretch py-5">
            <form onSubmit={handleSubmit} className=" w-2/3">
              <div className="flex justify-center">
                <div className="w-full mb-10 items-stretch">
                  <span className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-gray-700 xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base font-bold">
                    사용자 ID
                  </span>

                  <input
                    type="text"
                    name="userID"
                    value={fieldValues.userID}
                    onChange={handleFieldChange}
                    placeholder="ID를 입력해주세요."
                    className="rounded-md xl:text-base lg:text-base md:text-base sm:text-s xs:text-s bg-gray-100 focus:bg-white focus:border-gray-400 p-3 2xl:w-4/5 xl:w-3/4 lg:w-2/3 md:w-2/3 sm:w-2/3 xs:w-2/3"
                  />
                  {/* preventDefault를 위한 e 이벤트 객체 지정  */}
                  <button
                    className="border-blue-900 bg-blue-900 hover:border-blue-400 hover:bg-blue-400 xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm  text-white px-1 py-2 rounded md:ml-2 xs:ml-2 sm:ml-2"
                    readOnly
                    onClick={(e) => clickButton(e)}
                  >
                    중복확인
                  </button>
                  {nameValue.userID !== '' &&
                    userList?.filter((user) => user.userID === nameValue.userID)
                      .length > 0 && (
                      <p className="text-sm text-red-400">
                        동일한 아이디가 존재합니다. 다른 아이디를 입력해주세요.
                      </p>
                    )}
                  {nameValue.userID !== '' &&
                    userList?.filter((user) => user.userID === nameValue.userID)
                      .length === 0 && (
                      <h2 className="text-sm text-green-400">
                        사용가능한 아이디입니다.
                      </h2>
                    )}
                  {errorMessages.userID?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      다른 아이디를 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full mb-10 items-stretch">
                  <span className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block tracking-wide text-gray-700 xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-bold">
                    닉네임
                  </span>
                  <input
                    type="text"
                    name="nickname"
                    value={fieldValues.nickname}
                    onChange={handleFieldChange}
                    placeholder="닉네임을 입력해주세요."
                    className="rounded-md xl:text-base lg:text-base md:text-base sm:text-s xs:text-s  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 2xl:w-4/5 xl:w-3/4 lg:w-2/3 md:w-2/3 sm:w-2/3 xs:w-2/3"
                  />
                  {/* preventDefault를 위한 e 이벤트 객체 지정  */}
                  {/* 중복확인 */}
                  <button
                    className="border-blue-900 bg-blue-900 hover:border-blue-400 hover:bg-blue-400 xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm  text-white px-1 py-2 rounded md:ml-2 xs:ml-2 sm:ml-2"
                    onClick={(e) => clickButton(e)}
                    readOnly
                  >
                    중복확인
                  </button>
                  {nameValue.nickname !== '' &&
                    userList?.filter(
                      (user) => user.nickname === nameValue.nickname,
                    ).length > 0 && (
                      <p className="text-sm text-red-400">
                        동일한 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.
                      </p>
                    )}
                  {nameValue.nickname !== '' &&
                    userList?.filter(
                      (user) => user.nickname === nameValue.nickname,
                    ).length === 0 && (
                      <p className="text-sm text-green-400">
                        사용가능한 닉네임입니다.
                      </p>
                    )}
                  {errorMessages.nickname?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full mb-10">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700 pb-2">
                    사용자 이름
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={fieldValues.name}
                    onChange={handleFieldChange}
                    placeholder="이름을 입력해주세요."
                    className="rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 2xl:w-4/5 xl:w-3/4 lg:w-3/4 md:w-5/6 sm:w-full xs:w-full"
                  />
                  {errorMessages.name?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      사용할 수 없는 이름입니다. 다른 이름을 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full mb-10">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700 pb-2">
                    연락처
                  </span>
                  <input
                    type="text"
                    name="phone_number"
                    value={fieldValues.phone_number}
                    onChange={handleFieldChange}
                    placeholder="예) 010-0000-0000"
                    className="rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                  />
                  {errorMessages.phone_number?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      연락처를 정확하게 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full mb-10">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl xs:text-base  font-extrabold text-slate-700">
                    이메일
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={fieldValues.email}
                    onChange={handleFieldChange}
                    placeholder="예) user@email.com"
                    className="rounded-md xl:text-base lg:text-base md:text-base  xs:text-sm  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 2xl:w-4/5 xl:w-3/4 lg:w-2/3 md:w-2/3 sm:w-2/3 xs:w-2/3"
                  />
                  {/* 중복확인 */}
                  <button
                    className="border-blue-900 bg-blue-900 hover:border-blue-400 hover:bg-blue-400 xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm  text-white px-1 py-2 rounded md:ml-2 xs:ml-2 sm:ml-2"
                    onClick={(e) => clickButton(e)}
                    readOnly
                  >
                    중복확인
                  </button>
                  {nameValue.email !== '' &&
                    userList?.filter((user) => user.email === nameValue.email)
                      .length > 0 && (
                      <p className="text-sm text-red-400">
                        동일한 이메일이 존재합니다. 다른 이메일을 입력해주세요.
                      </p>
                    )}
                  {nameValue.email !== '' &&
                    userList?.filter((user) => user.email === nameValue.email)
                      .length === 0 && (
                      <p className="text-sm text-green-400">
                        사용가능한 이메일입니다.
                      </p>
                    )}
                  {errorMessages.email?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      이미 사용중인 이메일 입니다. 다른 이메일을 입력해주세요 .
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full mb-10">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700">
                    거주지역
                  </span>
                  <div className="relative">
                    <select
                      name="region"
                      value={fieldValues.region}
                      onChange={handleFieldChange}
                      className="block appearance-none rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
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

                    <div class="pointer-events-none absolute inset-y-0 right-5 flex items-center px-2 text-gray-700">
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
                    <p key={index} className="text-base text-red-400">
                      거주지역을 다시 선택해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full mb-10">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700">
                    비밀번호 퀴즈
                  </span>
                  <div className="relative">
                    <select
                      name="password_quiz"
                      value={fieldValues.password_quiz}
                      onChange={handleFieldChange}
                      className="block appearance-none rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                    >
                      <option value="내 보물 1호는?">내 보물 1호는?</option>
                      <option value="처음 키운 반려동물 이름은?">
                        처음 키운 반려동물 이름은?
                      </option>
                      <option value="어머니 성함은?">어머니 성함은?</option>
                      <option value="아버지 성함은?">아버지 성함은?</option>
                      <option value="좋아하는 음식은?">좋아하는 음식은?</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-5 flex items-center px-2 text-gray-700">
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
                    <p key={index} className="text-base text-red-400">
                      퀴즈를 다시 선택해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700">
                    비밀번호 퀴즈 정답
                  </span>
                  <input
                    type="text"
                    name="password_quiz_answer"
                    value={fieldValues.password_quiz_answer}
                    onChange={handleFieldChange}
                    placeholder="퀴즈 정답을 입력해주세요."
                    className="rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                  />

                  {errorMessages.password_quiz_answer?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      퀴즈 정답을 정확히 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>
              <h5 className="mt-1 lg:text-lg  sm:text-sm xs:text-xxs  ml-2 mb-10 text-blue-400">
                이 퀴즈의 정답은 비밀번호 찾기 시에 사용됩니다.
              </h5>

              <hr className="mb-3" />

              <div className="flex justify-center">
                <div className="w-full mb-10">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700">
                    비밀번호
                  </span>
                  <h5 className="mt-1 lg:text-lg  sm:text-sm xs:text-xxs mb-5 text-blue-900">
                    ( 비밀번호를 8자 이상 입력해주세요! )
                  </h5>
                  <input
                    type="password"
                    name="password"
                    value={fieldValues.password}
                    onChange={handleFieldChange}
                    placeholder="***********"
                    className="rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                  />
                  {errorMessages.password?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      입력형식이 맞지 않습니다. 다시 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full">
                  <span className="pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  font-extrabold text-slate-700">
                    비밀번호 확인
                  </span>
                  <h5 className="mt-1 lg:text-lg  sm:text-sm xs:text-xxs mb-5 text-blue-900">
                    ( 입력하신 비밀번호를 다시 입력해주세요 ! )
                  </h5>
                  <input
                    type="password"
                    name="password2"
                    value={fieldValues.password2}
                    onChange={handleFieldChange}
                    placeholder="***********"
                    className="rounded-md xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-base  bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                  />
                  {errorMessages.password2?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      위에 입력한 비밀번호와 맞지 않습니다. 다시 입력해주세요.
                    </p>
                  ))}
                </div>
              </div>

              <div className="text-center mt-5 px-1  rounded md:ml-2">
                <button className="shadow-md font-bold py-2 rounded-md border-blue-900 bg-blue-900 hover:border-blue-400 hover:bg-blue-400 xl:text-2xl lg:text-xl md:text-xl sm:text-xl xs:text-xl  text-white">
                  &nbsp;&nbsp;회원가입&nbsp;&nbsp;
                </button>

                {/* 저장 에러  */}
                <div>
                  {loading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
                  {error?.response?.status === 401 && (
                    <div className="text-red-400">회원가입에 실패했습니다.</div>
                  )}
                  {error && (
                    <>
                      <p className="text-red-400 mt-3 font-semibold">
                        😥 회원가입에 실패했습니다.
                      </p>
                      <p className="text-red-400 font-semibold ">
                        정보를 다시 확인해주세요.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
