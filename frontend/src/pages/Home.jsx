import React, { useEffect, useState } from 'react'
import { getTrendingPapers } from '../api/client';

const Home = () => {
  const [loading,setLoading] = useState(false);
  const [trending,setTrending] = useState([])

  useEffect(()=>{
    const fetchTrending = async () => {
    try {
      const res = await getTrendingPapers();
      setTrending(res.data.papers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchTrending();
  },[])
  return (
    <>
    <div>
      Home Page
    </div>

    <h2>Trending papers</h2>

    {loading ? (<p>Loading...</p>) 
    : 
    trending.length === 0 ? (<p>No trending Papers found</p>

    ): (
      trending.map((paper)=>(
        <div key={paper._id}>
          <h4>{paper.paperTitle}</h4>
      <p>{paper.examName} - {paper.year}</p>
        </div>
      ))
    )
    }

    </>
  )
}

export default Home
