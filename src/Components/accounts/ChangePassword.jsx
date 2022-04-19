import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import useFieldValues from 'hooks/useFieldValues';
import { ToastContainer, toast } from 'react-toastify';
import LoadingIndicator from 'LoadingIndicator';
import { useNavigate } from 'react-router-dom';
const INIT_FIELD_VALUES = {
  userID: '',
  name: '',
  password_quiz: '내 보물 1호는?',
  password_quiz_answer: '',
};

function ChangePassword() {
  const [findUser, setFindUser] = useState({});
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
  const navigate = useNavigate();

  const [
    { data: userList, loading, error: saveError, errorMessages },
    refetch,
  ] = useApiAxios(
    {
      url: `/accounts/api/usersnotpaging/?query=${findUser.name}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [findUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log('findUser: ', findUser);
  console.log('userList: ', userList);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [userList]);

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

  return (
    <>
      <div id="topLoc">
        <div className="mx-5 header rounded-xl sm:px-20 pt-6 pb-8 mb-4">
          <h2 className="text-center xs:text-3xl md:text-4xl py-5 pb-5 font-bold mb-3">
            🐯 비밀번호 변경하기
          </h2>

          {/* 로딩 에러 */}
          {loading && '로딩 중 ...'}
          {saveError && '로딩 중 에러가 발생했습니다.'}
          {saveError?.response?.status === 401 && (
            <div className="text-red-400">
              조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
            </div>
          )}
          <div className="flex justify-center">
            <div className="accounts_header shadow-md  rounded-xl ">
              <div className="max-w-m">
                <form
                  className="rounded-xl xs:px-10 sm:px-20 pt-6 mb-4"
                  onSubmit={handleSubmit}
                >
                  {/* 아이디 */}
                  <span className="mt-5 after:content-['*'] after:ml-0.5 after:text-red-500  block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                    사용자 아이디
                  </span>
                  <span className=" block uppercase tracking-wide text-blue-700 text-xxs font-bold mb-2">
                    : 회원님의 아이디를 입력해주세요.
                  </span>
                  <input
                    type="text"
                    name="userID"
                    value={fieldValues.userID}
                    onChange={handleFieldChange}
                    className="relative rounded p-3 text-xl mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400  px-3 md:mb-0"
                    placeholder="ID를 입력해주세요."
                  />
                  {errorMessages.userID?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      회원님의 아이디를 정확히 입력해주세요.{' '}
                    </p>
                  ))}

                  {/* 이름 */}
                  <span className="mt-5 after:content-['*'] after:ml-0.5 after:text-red-500  block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                    사용자 이름
                  </span>
                  <span className=" block uppercase tracking-wide text-blue-700 text-xxs font-bold mb-2">
                    : 회원님의 이름을 입력해주세요.
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={fieldValues.name}
                    onChange={handleFieldChange}
                    className="relative rounded p-3 text-xl mb-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400  px-3 md:mb-0"
                    placeholder="이름을 입력해주세요."
                  />
                  {errorMessages.name?.map((message, index) => (
                    <p key={index} className="text-base text-red-400">
                      회원님의 이름을 정확히 입력해주세요.{' '}
                    </p>
                  ))}

                  <br />

                  {/* 비밀번호 퀴즈  */}

                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500  mt-10 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                    비밀번호 퀴즈
                  </span>
                  <span className=" block uppercase tracking-wide text-blue-700 text-xxs font-bold mb-2">
                    : 회원가입시 선택한 퀴즈를 선택해주세요.
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
                    <p key={index} className="text-base text-red-400">
                      회원가입 시 선택한 퀴즈를 선택해주세요.
                    </p>
                  ))}

                  {/* 비밀번호 퀴즈 정답 */}

                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500  mt-10 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                    비밀번호 퀴즈 정답
                  </span>
                  <span className=" block uppercase tracking-wide text-blue-700 text-xxs font-bold mb-2">
                    : 회원가입시 선택한 퀴즈의 정답을 입력해주세요.
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
                    <p key={index} className="text-base text-red-400">
                      정확한 퀴즈의 정답을 입력해주세요.
                    </p>
                  ))}

                  <div className="mt-10 text-center text-2xl mb-10">
                    <button
                      type="submit"
                      className="bg-yellow-400 shadow-md hover:bg-yellow-700 border-yellow-400 hover:border-yellow-700 text-xl border-4 text-white rounded font-bold"
                      onClick={() =>
                        setFindUser({
                          userID: fieldValues.userID,
                          name: fieldValues.name,
                          password_quiz: fieldValues.password_quiz,
                          password_quiz_answer:
                            fieldValues.password_quiz_answer,
                        })
                      }
                    >
                      비밀번호 찾기
                    </button>
                    {/* 저장 에러  */}
                    <div>
                      {loading && (
                        <LoadingIndicator>저장 중 ...</LoadingIndicator>
                      )}
                      {saveError &&
                        `저장 중 에러가 발생했습니다. (${saveError.response?.status} ${saveError.response?.statusText})`}
                    </div>
                  </div>
                </form>
                <div className="text-center">
                  {userList && (
                    <div key={userList.userID} className="w-full">
                      {userList
                        .filter(
                          (user) =>
                            user.userID === findUser.userID &&
                            user.name === findUser.name &&
                            user.password_quiz === findUser.password_quiz &&
                            user.password_quiz_answer ===
                              findUser.password_quiz_answer,
                        )
                        .map((user) => (
                          <>
                            <div className="mt-5 mb-5" key={user.userID}>
                              <hr />
                              <span className="mt-3 mb-2 block uppercase tracking-wide text-blue-900 text-sm font-medium">
                                " {user.name} "님의 비밀번호 변경 링크입니다.
                              </span>
                              <p className="animate-bounce text-4xl">⬇</p>
                              <div className="text-center mr-5 mt-3">
                                <button
                                  onClick={() =>
                                    window.open(
                                      'http://api.highlight329.com/accounts/password_reset/',
                                      '_blank',
                                      navigate('/accounts/login/'),
                                    )
                                  }
                                  className="text-xl hover:bg-blue-200 hover:text-white font-semibold"
                                >
                                  <span class="h-3 w-3 text-blue-900 bg-gray-200 hover:text-white">
                                    링크로 이동하기
                                  </span>
                                </button>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePassword;
