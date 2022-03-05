// import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import useFieldValues from 'hooks/useFieldValues';
import '../../App.css';
import './accounts.css';
import LoadingIndicator from 'LoadingIndicator';

const INITIAL_FIELD_VALUES = { name: '', email: '' };

function FindId() {
  const [findUser, setFindUser] = useState({});

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  // findid는 get요청 -> loading 에러만 필요하다.
  const [{ data: userList, loading, error, errorMessages }, refetch] =
    useApiAxios(
      {
        url: `/accounts/api/usersnotpaging/?query=${findUser.name}`,
        method: 'GET',
        data: { name: findUser.name, email: findUser.email },
      },
      { manual: true },
    );

  useEffect(() => {
    refetch();
  }, [findUser]);

  //   const getQuery = (e) => {
  //     setQuery(e.target.value);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
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

  //-------------

  return (
    <>
      <div className="header rounded-xl pt-6 pb-8 mb-4" id="topLoc">
        <h2 className="text-center text-4xl py-5 pb-5 font-bold mb-3">
          {' '}
          🐹 아이디 찾기{' '}
        </h2>
        <span className="text-center block uppercase tracking-wide text-red-400 text-sm font-bold mb-3">
          아이디를 찾기 위해서는 회원님의 이름과 이메일이 필요합니다 ❕
        </span>

        {/* 저장 에러  */}
        <div>
          {error &&
            `페이지 이동 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
        </div>
        {error && '로딩 중 에러가 발생했습니다.'}
        {error?.response?.status === 401 && (
          <div className="text-red-400">
            조회에 실패했습니다. 입력하신 정보를 다시 확인해주세요.
          </div>
        )}

        <div className="flex justify-center">
          <div className="mx-5 accounts_header shadow-md rounded-xl">
            <form
              className="rounded-xl px-20 pt-6 mb-4"
              onSubmit={handleSubmit}
            >
              <span className="mt-5 after:content-['*'] after:ml-0.5 after:text-red-500  block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                사용자 이름{' '}
              </span>
              <span className=" block uppercase tracking-wide text-blue-700 text-xxs font-bold mb-2">
                : 회원가입 시 입력하신 이름을 입력해주세요.
              </span>
              <input
                type="text"
                name="name"
                value={fieldValues.name}
                onChange={handleFieldChange}
                className="rounded-md text-lg bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                placeholder="이름을 입력해주세요."
              />
              {errorMessages.name?.map((message, index) => (
                <p key={index} className="text-base text-red-400">
                  회원가입 시 입력한 이름을 정확히 입력해주세요!
                </p>
              ))}

              <span className="after:content-['*'] after:ml-0.5 after:text-red-500  mt-10 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                사용자 이메일{' '}
              </span>
              <span className=" block uppercase tracking-wide text-blue-700 text-xxs font-bold mb-2">
                : 회원가입 시 입력하신 이메일을 입력해주세요.
              </span>
              <input
                type="text"
                name="email"
                value={fieldValues.email}
                onChange={handleFieldChange}
                className="rounded-md text-lg bg-gray-100 focus:bg-white focus:border-gray-400 p-3 w-full"
                placeholder="이메일을 입력해주세요."
              />
              {errorMessages.email?.map((message, index) => (
                <p key={index} className="text-base text-red-400">
                  회원가입 시 입력한 이메일을 정확히 입력해주세요!
                </p>
              ))}

              <br />
              <div className="mt-10 text-center text-2xl mb-10">
                <button
                  type="submit"
                  className="bg-yellow-400 shadow-md hover:bg-yellow-700 border-yellow-400 hover:border-yellow-700 text-xl border-4 text-white rounded font-bold"
                  onClick={() =>
                    setFindUser({
                      name: fieldValues.name,
                      email: fieldValues.email,
                    })
                  }
                >
                  아이디 찾기
                </button>
                {/* 저장 에러  */}
                <div>
                  {loading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
                  {error &&
                    `저장 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
                </div>
              </div>
            </form>
            <hr />
            <div className="text-center">
              {userList && (
                <div className="w-full">
                  {userList
                    .filter(
                      (user) =>
                        user.name === findUser.name &&
                        user.email === findUser.email,
                    )
                    .map((user) => (
                      <>
                        <div className="mt-5 mb-5">
                          <span className="mb-2 block uppercase tracking-wide text-gray-700 text-base font-bold">
                            {user.name}님의 아이디는
                          </span>
                          <span className="bg-gray-100 text-xl text-gray-700  font-bold">
                            " {user.userID} " 입니다.
                          </span>
                          <div className="text-right mr-5 mt-5">
                            <a
                              href="/accounts/login/"
                              className=" text-right text-base hover:bg-blue-200 hover:text-white font-semibold"
                            >
                              <span class="h-3 w-3 text-gray-700">
                                <span class=" animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative rounded-full h-3 w-3 bg-sky-500"></span>{' '}
                                로그인하러 가기{' '}
                              </span>
                            </a>
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
    </>
  );
}

export default FindId;
