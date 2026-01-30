import React, { useEffect } from "react";
import axios from "axios";
const Papers = () => {
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/papers/");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, []);

  return <div> Papers Page</div>;
};

export default Papers;
