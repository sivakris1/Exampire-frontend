import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h2>{paper.metadata?.title || "Untitled Paper"}</h2>
      <p>Exam: {paper.examName}</p>
      <p>Stream: {paper.stream}</p>

      <h3>Details</h3>
      <pre>{JSON.stringify(paper.metadata, null, 2)}</pre>
    </div>
  );
};

export default PaperDetails;
