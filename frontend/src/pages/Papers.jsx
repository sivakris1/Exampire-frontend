import React, { useEffect, useState } from "react";
import PaperCard from "../components/PaperCard";
import { useSearchParams } from "react-router-dom";
import { getPapers, getSavedPapers } from "../api/client";
// import { getPapers, searchPapers } from "../api/client";

const Papers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [papers, setPapers] = useState([]);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");

  const [savedIds, setSavedIds] = useState([]);

  const sort = searchParams.get("sort") || "newest";

  const year = searchParams.get("year") || "";
  const shift = searchParams.get("session") || "";

  const exam = searchParams.get("exam");
  console.log("exam param =", exam);

  const page = parseInt(searchParams.get("page")) || 1;

  const handleYearChange = (value) => {
    if (value) {
      searchParams.set("year", value);
    } else {
      searchParams.delete("year");
    }

    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleShiftChange = (value) => {
    if (value) {
      searchParams.set("session", value);
    } else {
      searchParams.delete("session");
    }

    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleSortChange = (value) => {
    searchParams.set("sort", value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSearch = () => {
    if (query) {
      searchParams.set("q", query);
    } else {
      searchParams.delete("q");
    }

    const handleSearch = () => {
      if (query) {
        searchParams.set("q", query);
      } else {
        searchParams.delete("q");
      }

      searchParams.set("page", 1);
      setSearchParams(searchParams);
    };
  };

  useEffect(() => {
    const fetch = async () => {
      const nextPage = page;

      // // If filters change, force page = 1 BEFORE fetch
      // if (page !== 1 && (year || shift || exam)) {
      //   setPage(1);
      //   return;
      // }

      let sortBy = "createdAt";
      let sortOrder = "desc";

      const searchQuery = searchParams.get("q");

      if (sort === "oldest") {
        sortOrder = "asc";
      }

      if (sort === "views") {
        sortBy = "metadata.views";
      }

      try {
        setLoading(true);
        let response;

        if (searchQuery) {
          response = await searchPapers({
            q: searchQuery,
            page,
            examName: exam,
            year: year || undefined,
            session: shift || undefined,
          });
        } else {
          response = await getPapers({
            page,
            examName: exam,
            year: year || undefined,
            session: shift || undefined,
          });
        }

        setPapers(response.data.papers);
        setTotalPages(response.data.pagination.totalPages);

        setLoading(false);
      } catch (err) {
        setError("Failed to load papers");
        console.log(err)
      }
    };

    fetch();
  }, [exam, page, year, shift, sort]);

  useEffect(() => {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }, [exam, year, shift, sort]);

  useEffect(() => {
  const fetchSaved = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await getSavedPapers();
      const ids = res.data.papers.map(p => p._id);
      setSavedIds(ids);
    } catch (err) {
      console.error(err);
    }
  };

  fetchSaved();
}, [papers]);


  if (error) return <p>{error}</p>;

  if (loading) {
    return <p>Loading papers...</p>;
  } else {
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
              onChange={(e) => handleYearChange(e.target.value)}
            />
          </label>

          <select
            value={shift}
            onChange={(e) => handleShiftChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Shift 1</option>
            <option value="2">Shift 2</option>
          </select>

          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search papers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        {papers.length === 0 ? (
          <p>
            No papers found
            {year || shift ? " for the selected filters." : "."}
          </p>
        ) : (
          papers.map((paper) => <PaperCard key={paper._id} paper={paper} 
          isSaved={savedIds.includes(paper._id)}  /> )
        )}

        {totalPages >= 0 && (
          <div style={{ marginTop: "20px" }}>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
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
                    margin: "0 5px",
                  }}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Papers;
