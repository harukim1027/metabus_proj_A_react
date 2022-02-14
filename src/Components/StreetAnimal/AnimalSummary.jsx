import { Link } from 'react-router-dom';

function AnimalSummary({ animal }) {
  return (
    <div className="flex">
      <div>
        <Link to={`/streetanimal/${animal.animal_no}/`}>
          {animal.animal_no}
        </Link>
      </div>

      {animal.image && (
        <img
          src={animal.image}
          alt={animal.animal_no}
          className="w-10 h-10 mr-1 rounded ml-2"
        />
      )}

      <div>
        <Link to={`/streetanimal/${animal.animal_no}/`}>
          {animal.animal_reg_num}
        </Link>
      </div>

      <span>{animal.age}</span>
      <span>{animal.sex === '1' ? '암컷' : '수컷'}</span>
      <span>{animal.place_of_discovery}</span>
      <span>
        {animal.protection_status === '1' && '입양 대기'}
        {animal.protection_status === '2' && '입양 매칭 중'}
        {animal.protection_status === '3' && '입양 완료'}
      </span>
    </div>
  );
}

export default AnimalSummary;
