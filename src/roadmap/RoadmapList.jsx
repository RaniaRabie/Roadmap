import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate between pages
import axios from "axios";
import { Box } from "@mui/material";

const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    // Fetch all roadmaps from the JSON server
    axios
      .get("http://localhost:3200/roadmaps")
      .then((response) => {
        setRoadmaps(response.data); // Set the fetched roadmaps
      })
      .catch((error) => {
        console.error("Error fetching roadmaps:", error);
      });
  }, []);

  return (
    <div>
      <Box sx={{width: "80%", m:"auto", mt:3}}>
        <h2>All Roadmaps</h2>
        <ul style={{margin: "16px 0px"}} >
          {roadmaps.map((roadmap) => (
            <li key={roadmap.id} className="all-roadmaps" style={{margin: "16px 0px"}} >
              {/* Link to the Roadmap Detail page with the roadmap id */}
              <Link to={`/roadmap/${roadmap.id}`} className="roadmap">
                {roadmap.dataToPublish.roadmapName}
                <img src= {roadmap.dataToPublish.imageUrl} alt="forntend img" width={250}/>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default RoadmapList;
