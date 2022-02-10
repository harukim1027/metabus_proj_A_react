import { Link } from 'react-router-dom';

function AnimalSummary({ animal }) {
  return (
    <div className="flex">
      {animal.image && <img src={animal.image} alt={animal.animal_no} />}

      <div className="inline-block">
        <div>
          <Link to={`/streetanimal/${animal.animal_no}/`}>
            {animal.animal_no}
          </Link>
        </div>

        <div className="inline-block">{animal.age}</div>
        <div className="inline-block">{animal.sex}</div>
      </div>
    </div>
  );
}

export default AnimalSummary;
