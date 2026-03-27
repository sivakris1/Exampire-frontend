import { Navigate, useNavigate } from "react-router-dom";
import API, { favoritePaper, unfavoritePaper } from "../api/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";


const PaperCard = ({ paper, isSaved: initialSaved }) => {

  const cardStyle = {
  border: "1px solid #050a13",
  borderRadius: "40px",
  padding: "16px",
  marginBottom: "16px",
  cursor: "pointer",
  transition: "0.2s",
  background: "#fff",
};
  
  const navigate = useNavigate();

  const location = useLocation();

  const [favorites, setFavorites] = useState(paper.metadata?.favorites || 0);
  const [isSaved, setIsSaved] = useState(initialSaved);

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);
  

  const handleFavorite = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login", {
  state: {
    from: location.pathname + location.search
  },
  replace: false
});
return;
  }

  try {
    const res = await API.post(`/papers/${paper._id}/favorite`);

    setIsSaved(res.data.isFavorited);
    setFavorites(res.data.favoritesCount);

    if (res.data.isFavorited) {
      toast.success("Saved to your papers");
    } else {
      toast("Removed from saved");
    }

  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (
    <div
  style={cardStyle}
  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")}
  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
>

      <div onClick={() => navigate(`/papers/${paper._id}`)}>
        <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>
  {paper.paperTitle}
</h3>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
  {paper.examName} • {paper.year} • Shift {paper.shift}
</p>
        <p><strong>Difficulty:</strong> {paper.metadata?.difficulty}</p>
      </div>

      <div>
        <p>
          👁 {paper.metadata?.views} &nbsp; | &nbsp;
          ❤️ {favorites}
        </p>

        <button onClick={handleFavorite}
  style={{
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: isSaved ? "#ef4444" : "#e5e7eb",
    color: isSaved ? "#fff" : "#000",
    cursor: "pointer",
  }}
>
  {isSaved ? "Saved" : "Save"}
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
