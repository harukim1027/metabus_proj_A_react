import { useApiAxios } from 'api/base';
import TopNav from 'Components/Main/TopNavi';
import { useEffect } from 'react';
import AnimalSummary from './AnimalSummary';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import Button from 'Button';

function AnimalList() {
  const { auth } = useAuth();

  const [query, setQuery] = useState('');

  const [{ data: AnimalList, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${query ? '?query=' + query : ''}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <TopNav />
      <h2>AnimalList</h2>

      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="mt-3 ml-3 border-2 border-gray-300"
      />
      <button
        type="submit"
        onClick={() => refetch()}
        className="font-bold py-2 px-4 rounded cursor-pointer ml-1 bg-blue-500 hover:bg-blue-300 text-white"
      >
        검색
      </button>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      <div className="my-5">
        {AnimalList && (
          <div className="flex space-x-1">
            {AnimalList.map((animal, index) => (
              <div
                key={index}
                className="w-full md:w-1/4 l:w-1/3 px-4 transition-transform "
              >
                <AnimalSummary animal={animal} key={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimalList;
