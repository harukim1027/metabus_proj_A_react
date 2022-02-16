import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';

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
    <>
      <h2>마이페이지 내 정보</h2>
      <h2>이름 : {userData?.name}</h2>
      <h2>아이디 : {userData?.userID}</h2>
      <h2>닉네임 : {userData?.nickname}</h2>
      <h2>이메일 : {userData?.email}</h2>
      <h2>연락처 : {userData?.phone_number}</h2>
      <h2>거주지 : {userData?.region}</h2>
    </>
  );
}

export default Myinfo;
