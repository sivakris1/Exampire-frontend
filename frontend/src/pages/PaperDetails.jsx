import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPaperById, getRelatedPapers, logPaperView } from "../api/client";

const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await getPaperById(id);
        setPaper(res.data.paper || res.data);

        await logPaperView(id);

        const relatedRes = await getRelatedPapers(id);
        setRelated(relatedRes.data.relatedPapers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();

    const logView = async () => {
    const token = localStorage.getItem("token");

    if (!token) return; // skip if not logged in

    try {
      await logPaperView(id);
    } catch (err) {
      console.error("View log failed", err);
    }
  };

  logView();
  }, [id]);

  if (loading) return <p>Loading question papers, please wait...</p>;
  if (!paper) return <p>Unable to load paper details.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{paper.paperTitle || "Untitled Paper"}</h2>

      <section>
        <p>
          <strong>Exam:</strong> {paper.examName}
        </p>
        <p>
          <strong>Stream:</strong> {paper.stream}
        </p>
      </section>

      <section>
        {paper.metadata?.year && (
          <p>
            <strong>Year:</strong> {paper.year}
          </p>
        )}

        {paper.metadata?.shift && (
          <p>
            <strong>Shift:</strong> {paper.shift}
          </p>
        )}
      </section>

      {paper.cloudinaryUrl && (
        <div>
          <a
            href={paper.cloudinaryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View / Download PDF
          </a>
        </div>
      )}

      {/* Temporary debug section (keep for now) */}
      <details>
        <summary>Raw Metadata (debug)</summary>
        <pre>{JSON.stringify(paper.metadata, null, 2)}</pre>
      </details>

      <h3>Related Papers</h3>

      {related.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/papers/${p._id}`)}
          style={{ cursor: "pointer" }}
        >
          {p.paperTitle}
        </div>
      ))}
    </div>
  );
};

export default PaperDetails;
