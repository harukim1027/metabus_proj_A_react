import { Link } from 'react-router-dom';

function AnimalSummary({ animal }) {
  return (
    <div>
      {animal.image && <img src={animal.image} alt={animal.animal_no} />}

      <div className="flex">
        <div>
          <Link to={`/streetanimal/${animal.animal_no}/`}>
            {animal.animal_no}
          </Link>
        </div>
        <div>
          <Link to={`/streetanimal/${animal.animal_no}/`}>
            {animal.animal_reg_num}
          </Link>
        </div>

        <span>{animal.age}</span>
        <span>{animal.sex === '1' ? '암컷' : '수컷'}</span>
        <span>{animal.place_of_discovery}</span>
        <span>
          {animal.protection_status === '1'
            ? '입양 대기'
            : '2'
            ? '입양 매칭 중'
            : '입양 완료'}
        </span>
      </div>
    </div>
  );
}

export default AnimalSummary;
