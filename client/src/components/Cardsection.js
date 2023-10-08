import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import axios from "axios";

const Cardsection = ({ type }) => {
  const [videoss, setVideos] = useState([]);
  // console.log(videoss);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/videos/${type}`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [type]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: "92vw",
      }}
    >
      {videoss.map((video, index) => (
        <Cards key={index} video={video} />
      ))}
    </div>
  );
};

export default Cardsection;
