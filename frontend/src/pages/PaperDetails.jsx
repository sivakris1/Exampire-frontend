import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/papers/${id}`
        );
        setPaper(res.data.paper || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  if (loading) return <p>Loading paper...</p>;
  if (!paper) return <p>Paper not found</p>;

  return (
    <div>
  <button onClick={() => navigate(-1)}>← Back</button>

  <h2>{paper.paperTitle || "Untitled Paper"}</h2>

  <section>
    <p><strong>Exam:</strong> {paper.examName}</p>
    <p><strong>Stream:</strong> {paper.stream}</p>
  </section>

  <section>
    {paper.metadata?.year && (
      <p><strong>Year:</strong> {paper.metadata.year}</p>
    )}

    {paper.metadata?.shift && (
      <p><strong>Shift:</strong> {paper.metadata.shift}</p>
    )}
  </section>

  {/* Temporary debug section (keep for now) */}
  <details>
    <summary>Raw Metadata (debug)</summary>
    <pre>{JSON.stringify(paper.metadata, null, 2)}</pre>
  </details>
</div>

  );
};

export default PaperDetails;
