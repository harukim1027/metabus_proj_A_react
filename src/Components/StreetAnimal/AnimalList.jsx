import { useApiAxios } from 'api/base';
import TopNav from 'Components/Main/TopNavi';
import { useEffect } from 'react';
import AnimalSummary from './AnimalSummary';
import { useAuth } from 'contexts/AuthContext';

function AnimalList() {
  const [auth] = useAuth();

  const [{ data: AnimalList, loading, error }, refetch] = useApiAxios(
    {
      url: '/streetanimal/api/animal/',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <TopNav />
      <h2>AnimalList</h2>

      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}

      {AnimalList && (
        <div className="flex flex-wrap">
          {AnimalList.map((animal, index) => (
            <div key={index}>
              <AnimalSummary animal={animal} key={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnimalList;
