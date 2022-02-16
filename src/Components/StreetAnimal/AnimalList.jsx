import { useApiAxios } from 'api/base';
import TopNav from 'Components/Main/TopNavi';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        placeholder="등록번호로 검색"
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
        <table className="border-2">
          <thead className="border-2">
            <tr>
              <th className="border-2">번호</th>
              <th className="border-2">동물 종</th>
              <th className="border-2">이미지</th>
              <th className="border-2">등록번호</th>
              <th className="border-2">나이</th>
              <th className="border-2">성별</th>
              <th className="border-2">발견장소</th>
              <th className="border-2">입양 상태</th>
            </tr>
          </thead>

          <tbody>
            {AnimalList &&
              AnimalList.map((animal) => (
                <tr>
                  <td>
                    <Link to={`/admin/animal/${animal.animal_no}/`}>
                      {animal.animal_no}
                    </Link>
                  </td>
                  <td>
                    {animal.category.id === 1 && '강아지'}
                    {animal.category.id === 2 && '고양이'}
                    {animal.category.id === 3 && '기타동물'}
                  </td>
                  <td>
                    <Link to={`/admin/animal/${animal.animal_no}/`}>
                      <img
                        src={animal.image}
                        alt={animal.animal_no}
                        className="w-10 h-10"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/animal/${animal.animal_no}/`}>
                      {animal.animal_reg_num}
                    </Link>
                  </td>
                  <td>{animal.age}</td>
                  <td>{animal.sex === '1' ? '암컷' : '수컷'}</td>
                  <td>{animal.place_of_discovery}</td>
                  <td>
                    {animal.protection_status === '1' && '입양 대기'}
                    {animal.protection_status === '2' && '입양 매칭 중'}
                    {animal.protection_status === '3' && '입양 완료'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnimalList;
