import { useEffect, useState } from "react";
import { getSavedPapers } from "../api/client";
import PaperCard from "../components/PaperCard";

const SavedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await getSavedPapers();
        setPapers(res.data.papers || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) return <p>Loading saved papers...</p>;

  if (!papers.length) return <p>No saved papers yet.</p>;

  return (
    <div>
      <h2>Saved Papers</h2>

      {papers.map((paper) => (
        <PaperCard key={paper._id} paper={paper} />
      ))}
    </div>
  );
};

export default SavedPapers;