import React, { useEffect, useState } from "react";
import axios from "axios";
const Papers = () => {

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/papers/");
        setPapers(response.data.papers);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return (
     <div>
      <h1>Question Papers</h1>

      {papers.length === 0 ? (
        <p>No papers found</p>
      ) : (
        papers.map((paper) => (
          <div key={paper._id}>
            <h3>{paper.examName}</h3>
            <p>{paper.stream}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Papers;
