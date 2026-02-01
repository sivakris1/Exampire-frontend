import { useNavigate } from "react-router-dom";

const PaperCard = ({ paper }) => {
  const navigate = useNavigate();
  console.log(paper)

  return (
    <div>
      <h4 onClick={() => navigate(`/papers/${paper._id}`)}>{paper?.paperTitle || "Untitled Paper"}</h4>
      <p>{paper.examName}</p>
      <p>{paper.stream}</p>
    </div>
  );
};

export default PaperCard;
