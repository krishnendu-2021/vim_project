import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Cards = ({ video }) => {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios.get(`/users/find/${video.userId}`);
      setChannel(response.data);
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <div className="card" style={{ width: "18rem", margin: "10px" }}>
        <img className="card-img-top" src={video.imgUrl} alt="Card image cap" />
        <div
          style={{
            display: "flex",
          }}
        >
          <Avatar
            name={channel.name}
            size="40"
            round={true}
            style={{
              padding: " var(--bs-card-spacer-y) var(--bs-card-spacer-x)",
              marginRight: "10px",
            }}
          />
          <div className="card-body">
            <p
              className="card-text"
              style={{ fontWeight: "bold", margin: "0px" }}
            >
              {video.desc}
            </p>
            <p className="card-text" style={{ margin: "0px" }}>
              {channel.name}
            </p>
            <p style={{ margin: "0px" }}>
              {video.views} views . <small>{format(video.updatedAt)}</small>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
