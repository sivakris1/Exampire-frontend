import { useNavigate } from "react-router-dom";
import { favoritePaper, unfavoritePaper } from "../api/client";
import { useState } from "react";

const PaperCard = ({ paper }) => {
  const navigate = useNavigate();
  console.log(paper)

  const [favorites, setFavorites] = useState(paper.metadata?.favorites || 0);
  const [liked, setLiked] = useState(false);

  const handleFavorite = async() => {
    try {
      if(!liked){
        await favoritePaper(paper._id);
        setFavorites((prev) => prev+1);
        setLiked(true);
      }
      else{
        await unfavoritePaper(paper._id);
        setFavorites((prev)=>Math.max(prev-1,0))
        setLiked(false);
      }
    } catch (error) {
      
    }
  }

  return (
  
     <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
      <h3>{paper.paperTitle}</h3>

      <p><strong>Exam:</strong> {paper.examName}</p>
      <p><strong>Year:</strong> {paper.year}</p>
      <p><strong>Shift:</strong> {paper.shift}</p>
      <p><strong>Difficulty:</strong> {paper.metadata?.difficulty}</p>

      <p>
        👁 {paper.metadata?.views} &nbsp; | &nbsp;
        ❤️ {favorites}
      </p>

      <button onClick={handleFavorite}>
        {liked ? "Unfavorite" : "Favorite"}
      </button>

      <br /><br />

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
