import useFieldValues from 'hooks/useFieldValues';

function SearchAnimal() {
  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues({
    size: 1,
    sex: 1,
  });

  return (
    <>
      {/* 동물 검색하는 부분 */}
      <form>
        <h2>크루원 검색</h2>
        <div className="py-2">
          <h2 className="inline">크루원의 사이즈 : </h2>
          <select
            name="size"
            value={fieldValues.size}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
            defaultValue="1"
          >
            <option value="1">소형</option>
            <option value="2">중형</option>
            <option value="3">대형</option>
          </select>
        </div>

        <div className="py-2">
          <h2 className="inline">크루원의 성별 : </h2>
          <select
            name="sex"
            value={fieldValues.sex}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
            defaultValue="1"
          >
            <option value="1">암컷</option>
            <option value="2">수컷</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default SearchAnimal;
