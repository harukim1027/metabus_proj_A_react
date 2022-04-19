import { createContext, useCallback, useContext } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const INITIAL_AUTH = { isLoggedIn: false };

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  // 공유할 상탯값을 정의
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  const login = useCallback(
    ({
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
    }) => {
      setAuth({
        isLoggedIn: true,
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
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
    navigate('/');
  }, [setAuth]);

  // 하위 컴포넌트에서 공유할 값/함수들을 value로 지정합니다.

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
