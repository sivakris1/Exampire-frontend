import React, { useEffect, useState } from "react";
import axios from "axios";
import PaperCard from "../components/PaperCard";
import { useSearchParams } from "react-router-dom";
import { getPapers } from "../api/client";
const Papers = () => {

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const exam = searchParams.get('exam');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await getPapers();
        const allPapers = response.data.papers;

        const filtered = exam
          ? allPapers.filter((p) => p.examName === exam)
          : allPapers;

        setPapers(filtered);

      } catch (error) {
        console.error("Error fetching papers:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchPapers();
  }, [exam]);

  return (
     <div>
      <h2>{exam} Papers</h2>

      {papers.length === 0 ? (
        <p>No papers found</p>
      ) : (
        papers.map((paper) => (
          <PaperCard key={paper._id} paper={paper} />
        ))
      )}
    </div>
  );
};

export default Papers;
