import React from "react";
import Avatar from "react-avatar";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { format } from "timeago.js";

const VideoContainer = ({ channel, video }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  console.log(video);
  console.log(channel);
  const videoDiv = {
    display: "flex",
    height: "70px",
  };
  const leftSection = {
    display: "flex",
    flexGrow: 1,
    height: "70px",
    alignItems: "center",
  };
  const rightSection = {
    display: "flex",
    height: "70px",
    alignItems: "center",
  };
  const buttonClass = {
    borderRadius: "50px",
    padding: "8px",
    width: "100px",
  };
  return (
    <div className="container my-3">
      <iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/DkzQxw16G9w?si=7KhkYA4-gi29w5tL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h3>{video.title}</h3>
      <p>
        {video.views} views . {format(video.updatedAt)}
      </p>
      <div style={videoDiv} className="my-1">
        <div style={leftSection}>
          <Avatar
            name={channel.name}
            round={true}
            size="40"
            style={{ marginRight: "10px" }}
          />
          <small className="mx-2">
            {channel.name} <br /> {channel.subscribers} subscriber
          </small>
        </div>
        <div style={rightSection}>
          <button style={buttonClass} className="mx-3">
            <ThumbUpAltIcon /> {video.likes.length}
          </button>
          |
          <button style={buttonClass} className="mx-3">
            <ThumbDownAltIcon /> {video.dislikes.length}
          </button>
          <button style={buttonClass} className="mx-3 btn btn-danger">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
