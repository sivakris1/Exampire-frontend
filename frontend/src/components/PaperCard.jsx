import { useNavigate } from "react-router-dom";

const PaperCard = ({ paper }) => {
  const navigate = useNavigate();
  console.log(paper)

  return (
    

    <div onClick={() => navigate(`/papers/${paper._id}`)}
    style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }} >
      <h3>{paper.paperTitle}</h3>

      <p><strong>Exam:</strong> {paper.examName}</p>
      <p><strong>Year:</strong> {paper.year}</p>
      <p><strong>Shift:</strong> {paper.shift}</p>
      <p><strong>Difficulty:</strong> {paper.metadata?.difficulty}</p>

      <p>
        👁 {paper.metadata?.views} &nbsp; | &nbsp;
        ❤️ {paper.metadata?.favorites}
      </p>

      <a
        href={paper.cloudinaryUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Paper
      </a>
    </div>
  );
};

export default PaperCard;
