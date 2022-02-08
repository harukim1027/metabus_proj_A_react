import { useApiAxios } from 'api/base';

import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

// INIT_VALUES는 가급적 밖에 지정하는 것이 좋음 !
const INIT_FIELD_VALUES = { username: '', password: '' };

function Account({ username }) {
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange, formData, handleDidSave } =
    useFieldValues(username || INIT_FIELD_VALUES);
  // 데이터가 저장된 곳은 fieldValues
  const [
    {
      data: user,
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    requestToken,
  ] = useApiAxios(
    {
      url: !username
        ? `http://localhost:8000/accounts/api/token/`
        : `http://localhost:8000/accounts/api/token/${username}/`,
      method: !username ? 'POST' : 'GET',
    },
    { manual: true },
  );

  // 저장 후 전송할 함수
  // 직접적으로 지정을 했기 때문에 ~ 이벤트 객체를 가질 수 있음
  const handleSubmit = (e) => {
    e.preventDefault(); // submit의 기본 동작 : 페이지가 바뀌면서 화면을 새로그리는 것
    // 이를 막고~ 우리가 원하는 함수만 호출하기 위해서 .preventDefault를 해야함

    requestToken({
      data: formData,
    }).then((response) => {
      // 성공을 하면 promise -> then을 반환 / 에러면 .catch
      // then으로 받은 데이터를 저장
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
      navigate(`/accounts/profile/${user.id}/`);
    });
  }; // 에러는 위에서 상탯값으로 받기로 했기 때문에 따로 안하는 것

  return (
    <>
      <div className="my-3">
        <h2 className="my-3">Login</h2>
        <hr />
        {saveError?.response.status === 401 && (
          <div className="text-red-400">로그인에 실패했습니다.</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="my-3 block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              ID
              <input
                name="username"
                value={fieldValues.username}
                onChange={handleFieldChange}
                type="text"
                placeholder="아이디를 입력해주세요."
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </label>
          </div>
          <div className="my-3 block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
              <input
                name="password"
                value={fieldValues.password}
                onChange={handleFieldChange}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </label>
          </div>
          <button type="pink" onChange={handleSubmit}>
            로그인하기
          </button>
        </form>

        <hr className="my-3" />
        <div className="my-3">
          <p> ID : {fieldValues.username}</p>
          <p> PW : {fieldValues.password}</p>
        </div>
      </div>
    </>
  );
}
export default Account;
