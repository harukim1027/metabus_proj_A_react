// key : localStorage에 저장될 키 이름
// initialValue : 키의 초기값
import { useEffect, useState } from 'react';
function useLocalStorage(key, initialValue) {
  // useState에 초깃값 지정을 안하면, undefined로 지정됨
  // useState의 초깃값으로 함수를 지정할 수 있음. 상탯값을 지정할 때(초기값) 한번 실행됨
  const [data, setData] = useState(() => {
    // 지정키로 아이템을 읽어옴
    const jsonString = window.localStorage.getItem(key);

    try {
      return jsonString ? JSON.parse(jsonString) : initialValue;
      // 참이면 parsing한 결과를, 거짓이면 initialValue를
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });
  // 이 코드만으로 초깃값 로딩이 가능

  //   // useState와 동일한 형태로 리턴하고자 함
  //   // TODO : 고민해볼문제 :
  //   const setDataToLocalStorage = (value) => {
  //     // FIXME : value가 함수일 때, 외부 data 참조
  //     const valueToStore = value instanceof Function ? value(data) : value;

  //     setData(valueToStore);
  //     window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //   };

  // 데이터가 바뀌면
  useEffect(() => {
    const jsonString = JSON.stringify(data);
    window.localStorage.setItem(key, jsonString);
  }, [key, data]);

  return [data, setData];
  // 데이터(data->밖에서 참조할 애라서 그대로 넘겨도 됨)
  //하지만 useState의 setData는 그냥 넘기면 안됨!
  // 별도로 setter 함수를 따로 만듦!
}
export default useLocalStorage;
