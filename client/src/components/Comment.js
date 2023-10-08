import React from "react";
import Avatar from "react-avatar";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="allCommentShow d-flex my-2 ">
        <Avatar size="40" round={true} name={comment.userId} />
        <p className="mx-3">{comment.desc}</p>
      </div>
    </>
  );
};

export default Comment;
