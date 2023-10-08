import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Recomended from "./Recomended";
import Avatar from "react-avatar";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { format } from "timeago.js";
// import VideoContainer from "./VideoContainer";
import Comment from "./Comment";
import { videoSuccess, videoDislike, videoLike } from "../redux/videoSlice";
import { userSubscribe } from "../redux/userSlice";
import styled from "@emotion/styled";

const Video = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const path = useLocation();

  const videoId = path.pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [comments, setComments] = useState([]);

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
  const inputStyle = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid #000",
    outline: "none",
  };

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(videoLike(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDislike = async () => {
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(videoDislike(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubscribe = async () => {
    try {
      currentUser.subscribedUser.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
      dispatch(userSubscribe(channel._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${videoId}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.video.userId}`
        );
        const commentsRes = await axios.get(`/comments/${videoId}`);
        setComments(commentsRes.data.comments);
        dispatch(videoSuccess(videoRes.data.video));
        setChannel(channelRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [videoId, dispatch]);

  const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
  `;

  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <div className="container d-flex flex-column">
        <div className="container my-3">
          <VideoFrame controls src={currentVideo.videoUrl}></VideoFrame>

          <h3>{currentVideo ? currentVideo.title : ""}</h3>
          <p>
            {currentVideo ? `${currentVideo.views} views` : ""} .{" "}
            {currentVideo ? format(currentVideo.updatedAt) : ""}
          </p>
          <div style={videoDiv} className="my-1">
            <div style={leftSection}>
              <Avatar
                name={channel ? channel.name : ""}
                round={true}
                size="40"
                style={{ marginRight: "10px" }}
              />
              <small className="mx-2">
                {channel ? channel.name : ""}
                <br /> {channel ? channel.subscribers : ""} subscriber
              </small>
            </div>
            <div style={rightSection}>
              <button style={buttonClass} className="mx-3" onClick={handleLike}>
                {currentVideo ? (
                  currentVideo.likes.includes(currentUser._id) ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )
                ) : (
                  <ThumbUpAltIcon />
                )}
                {currentVideo ? currentVideo.likes.length : ""}
              </button>
              |
              <button
                style={buttonClass}
                className="mx-3"
                onClick={handleDislike}
              >
                {currentVideo ? (
                  currentVideo.dislikes.includes(currentUser._id) ? (
                    <ThumbDownAltIcon />
                  ) : (
                    <ThumbDownOffAltIcon />
                  )
                ) : (
                  <ThumbDownAltIcon />
                )}
                {currentVideo ? currentVideo.dislikes.length : ""}
              </button>
              <button
                style={buttonClass}
                className="mx-3 btn btn-danger"
                onClick={handleSubscribe}
              >
                {currentUser
                  ? currentUser.subscribedUser?.includes(channel._id)
                    ? "Subscribed"
                    : "Subscribe"
                  : ""}
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mx-2 ">
          <h3>Comments</h3>
          <div className="userComment d-flex my-3">
            <Avatar size="40" round={true} />
            <input
              placeholder="Enter Comment Here!!!"
              className="mx-3"
              style={inputStyle}
            />
          </div>
          {comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      </div>
      <Recomended />
    </div>
  );
};

export default Video;
