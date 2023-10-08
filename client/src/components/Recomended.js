import React from "react";
import RecomendedVideoCard from "./RecomendedVideoCard";

const Recomended = () => {
  return (
    <div
      className="px-1 py-1 mx-1"
      style={{ width: "550px", minHeight: "400px" }}
    >
      <h2> Recomended Videos </h2>
      <div className="my-3">
        <RecomendedVideoCard />
        <RecomendedVideoCard />
      </div>
    </div>
  );
};

export default Recomended;
