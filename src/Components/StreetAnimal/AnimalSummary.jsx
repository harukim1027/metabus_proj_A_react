import { Link } from 'react-router-dom';

function AnimalSummary({ animal }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <div>
                <Link to={`/streetanimal/${animal.animal_no}/`}>
                  {animal.animal_no}
                </Link>
              </div>
            </td>
            <td>
              {animal.image && (
                <img
                  src={animal.image}
                  alt={animal.animal_no}
                  className="w-10 h-10 mr-1 rounded ml-2"
                />
              )}
            </td>
            <td>
              <div>
                <Link to={`/streetanimal/${animal.animal_no}/`}>
                  {animal.animal_reg_num}
                </Link>
              </div>
            </td>
            <td>
              <span>{animal.age}</span>
            </td>
            <td>
              <span>{animal.sex === '1' ? '암컷' : '수컷'}</span>
            </td>
            <td>
              <span>{animal.place_of_discovery}</span>
            </td>
            <td>
              <span>
                {animal.protection_status === '1' && '입양 대기'}
                {animal.protection_status === '2' && '입양 매칭 중'}
                {animal.protection_status === '3' && '입양 완료'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AnimalSummary;
