import React from "react";
import Cardsection from "./Cardsection";
import Sidebar from "./Sidebar";

const Home = ({ type }) => {
  return (
    <div
      style={{
        backgroundColor: "#130b6aee",
        display: "flex",
        minHeight: "95vh",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{`${type}`} Vedios</h2>
        <Cardsection type={type} />
      </div>
      <Sidebar />
    </div>
  );
};

export default Home;
