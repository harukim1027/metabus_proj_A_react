// key : localStarage에 저장될 키 이름
// initialValue : 키의 초기값

import { useEffect, useState } from 'react';

function useLocalStarage(key, initialValue) {
  const [data, setData] = useState(() => {
    // key가 없다면 null
    const jsonString = window.localStorage.getItem(key);
    try {
      return jsonString ? JSON.parse(jsonString) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  useEffect(() => {
    const jsonString = JSON.stringify(data);
    window.localStorage.setItem(key, jsonString);
  }, [key, data]);

  // value : 함수 방식은 지원하지 않습니다.
  // TODO : 고민해볼 문제 : data에 대한 useEffect로서 구현해볼 수 있지 않을까?
  //   const setDataToLocalStorage = (value) => {
  //     // FIXME: value가 함수일 때, 외부 data 참조하는 부분
  //     const valueToStore = value instanceof Function ? value(data) : value;
  //     setData(valueToStore);
  //     window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //   };

  return [data, setData];
}

export default useLocalStarage;
