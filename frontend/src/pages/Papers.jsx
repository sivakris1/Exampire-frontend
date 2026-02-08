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

  const [year, setYear] = useState("");
  const [shift, setShift] = useState("");

  const availableYears = [...new Set(papers.map((p) => p.year))].sort(
  (a, b) => b - a
);

const availableShifts = [...new Set(papers.map((p) => p.shift))].sort();


  const exam = searchParams.get("exam");

  const filteredPapers = papers.filter((paper) => {
  // YEAR FILTER
  if (year && paper.year !== Number(year)) return false;

  // SHIFT FILTER
  if (shift && paper.shift !== Number(shift)) return false;

  return true;
});

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
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [exam]);

  return (
    <div>
      <h2>{exam} Papers</h2>

      <div>
        <label>
  Year:
  <select value={year} onChange={(e) => setYear(e.target.value)}>
    <option value="">All</option>
    {availableYears.map((y) => (
      <option key={y} value={y}>
        {y}
      </option>
    ))}
  </select>
</label>

<label>
  Shift:
  <select value={shift} onChange={(e) => setShift(e.target.value)}>
    <option value="">All</option>
    {availableShifts.map((s) => (
      <option key={s} value={s}>
        Shift {s}
      </option>
    ))}
  </select>
</label>

      </div>

      {filteredPapers.length === 0 ? (
        <p>
  No papers found
  {year || shift ? " for the selected filters." : "."}
</p>

      ) : (
        filteredPapers.map((paper) => <PaperCard key={paper._id} paper={paper} />)
      )}
    </div>

  );
};

export default Papers;
