// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import IconButton from '@mui/material/IconButton'
// import DeleteIcon from '@mui/icons-material/Delete';

// const AllRoadmaps = () => {
//   const [nodes, setNodes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:3200/roadmaps")
//       .then((response) => {
//         setNodes(response.data); // Adjusted to fit the JSON structure
//       })
//       .catch((error) => {
//         console.error("Error fetching node entries:", error);
//       });
//   }, []);

//   const handleNodeClick = (id) => {
//     navigate(`/create/${id}`);
//   };

//   const handleDelete = () => {
//     // Send updated node data to the server
//     axios.put(`http://localhost:3200/roadmaps/${id}`, {})
//       .then(() => {
//         console.log("Node entry Deleted successfully.");
        
//       })
//       .catch((error) => {
//         console.error("Error Deleting Roadmap:", error);
//       });
//   };

//   return (
//     <div>
//       <h1>All Roadmaps</h1>
//       <ul>
//         {nodes.map((node) => (
//           <li key={node.id}>
//             <button onClick={() => handleNodeClick(node.id)}>
//                {node.dataToPublish.roadmapName}
//             </button>
//             <IconButton aria-label="" onClick={handleDelete}>
//               <DeleteIcon/>
//             </IconButton>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllRoadmaps;







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const AllRoadmaps = () => {
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3200/roadmaps")
      .then((response) => {
        setNodes(response.data); // Adjusted to fit the JSON structure
      })
      .catch((error) => {
        console.error("Error fetching Roadmaps:", error);
      });
  }, []);

  const handleNodeClick = (id, dataToPublish) => {
    navigate(`/details/${id}`, { state: dataToPublish });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3200/roadmaps/${id}`)
      .then(() => {
        console.log("Roadmap deleted successfully.");
        
        // Update local state to remove the deleted node
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting roadmap:", error);
      });
  };

  return (
    <div>
      <h1>All Roadmaps</h1>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            <button onClick={() => handleNodeClick(node.id,node.dataToPublish)}>
              {node.dataToPublish.roadmapName}
            </button>
            <IconButton aria-label="delete" onClick={() => handleDelete(node.id)}>
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllRoadmaps;
