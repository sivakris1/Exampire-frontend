import React, { useEffect, useState } from "react";
import PaperCard from "../components/PaperCard";
import { useSearchParams } from "react-router-dom";
import { getPapers } from "../api/client";

const Papers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [papers, setPapers] = useState([]);
  
  const [totalPages, setTotalPages] = useState(1);

  const [year, setYear] = useState("");
  const [shift, setShift] = useState(""); // maps to session

  const exam = searchParams.get("exam");
  console.log("exam param =", exam);

  const page = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
  searchParams.set("page", newPage);
  setSearchParams(searchParams);
};



  useEffect(() => {
  const fetch = async () => {
    const nextPage = page;

    // // If filters change, force page = 1 BEFORE fetch
    // if (page !== 1 && (year || shift || exam)) {
    //   setPage(1);
    //   return;
    // }

    try {
      const response = await getPapers({
        page: nextPage,
        examName: exam,
        year: year || undefined,
        session: shift || undefined,
      });

      setPapers(response.data.papers);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  fetch();
}, [exam, page, year, shift]);

useEffect(() => {
  searchParams.set("page", 1);
  setSearchParams(searchParams);
}, [exam, year, shift]);




  return (
    <div>
      <h2>{exam} Papers</h2>

      <div>
        <label>
          Year:
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>

        <select value={shift} onChange={(e) => setShift(e.target.value)}>
          <option value="">All</option>
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
        </select>
      </div>

      {papers.length === 0 ? (
        <p>
          No papers found
          {year || shift ? " for the selected filters." : "."}
        </p>
      ) : (
        papers.map((paper) => <PaperCard key={paper._id} paper={paper} />)
      )}

      {totalPages >=0  && (
  <div style={{ marginTop: "20px" }}>
    <button
      disabled={page === 1}
      onClick={() => handlePageChange(page-1)}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => {
      const pageNumber = index + 1;
      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          style={{
            fontWeight: page === pageNumber ? "bold" : "normal",
            margin: "0 5px"
          }}
        >
          {pageNumber}
        </button>
      );
    })}

    <button
      disabled={page === totalPages}
      onClick={() => handlePageChange(page+1)}
    >
      Next
    </button>
  </div>
)}
    </div>
  );
};

export default Papers;
