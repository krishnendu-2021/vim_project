import React from "react";

const RecomendedVideoCard = () => {
  return (
    <div
      className=" my-2 "
      style={{
        height: "100px",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontWeight: "bold",
            border: "2px solid black",
            height: "100px",
          }}
        >
          <img
            src="../assets/VIM__1_-removebg-preview.png"
            alt=""
            height="100px"
            width="150px"
          />
        </div>
        <div
          className="container"
          style={{ border: "2px solid black", height: "100px" }}
        >
          <h5 style={{ marginBottom: "5px" }}>VIDEO TITLE</h5>
          <small>
            Channel Name <br /> 12M views . 1 yr ago
          </small>
        </div>
      </div>
    </div>
  );
};

export default RecomendedVideoCard;
