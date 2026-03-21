import { useNavigate } from "react-router-dom";
import API, { favoritePaper, unfavoritePaper } from "../api/client";
import { useEffect, useState } from "react";

const PaperCard = ({ paper, isSaved: initialSaved }) => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(paper.metadata?.favorites || 0);
  const [isSaved, setIsSaved] = useState(initialSaved);

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);

  

  const handleFavorite = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.post(`/papers/${paper._id}/favorite`);

      setIsSaved(res.data.isFavorited);
      setFavorites(res.data.favoritesCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>

      <div onClick={() => navigate(`/papers/${paper._id}`)}>
        <h3>{paper.paperTitle}</h3>
        <p><strong>Exam:</strong> {paper.examName}</p>
        <p><strong>Year:</strong> {paper.year}</p>
        <p><strong>Shift:</strong> {paper.shift}</p>
        <p><strong>Difficulty:</strong> {paper.metadata?.difficulty}</p>
      </div>

      <div>
        <p>
          👁 {paper.metadata?.views} &nbsp; | &nbsp;
          ❤️ {favorites}
        </p>

        <button onClick={handleFavorite}>
          {isSaved ? "❤️ Saved" : "🤍 Save"}
        </button>

        <br /><br />

        <a href={paper.cloudinaryUrl} target="_blank" rel="noopener noreferrer">
          Download Paper
        </a>
      </div>
    </div>
  );
};
export default PaperCard;
