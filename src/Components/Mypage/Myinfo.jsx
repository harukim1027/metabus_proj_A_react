import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import Sidebar from 'Components/Mypage/Sidebar';

function Myinfo() {
  const { auth } = useAuth();
  const [{ data: userData }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.userID}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="w-full h-screen bg-blue-100">
        <div className="flex justify-center">
          <div className="inline-block mt-10">
            <h2>내 정보</h2>
            <h2>이름 : {userData?.name}</h2>
            <h2>아이디 : {userData?.userID}</h2>
            <h2>닉네임 : {userData?.nickname}</h2>
            <h2>이메일 : {userData?.email}</h2>
            <h2>연락처 : {userData?.phone_number}</h2>
            <h2>거주지 : {userData?.region}</h2>
            <h2>비밀번호 퀴즈 : {userData?.password_quiz}</h2>
            <h2>비밀번호 퀴즈 정답 : {userData?.password_quiz_answer}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myinfo;
