import { useNavigate } from "react-router-dom";

const Exams = () => {
  const navigate = useNavigate();

  const exams = ["JEE Main", "EAMCET"];

  return (
    <div>
      <h1>Exams</h1>

      {exams.map((exam) => (
        <div key={exam}>
          <button onClick={() => navigate(`/papers?exam=${exam}`)}>
            {exam}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Exams;
