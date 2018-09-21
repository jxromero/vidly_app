import React from "react";

// Input: liked: boolean
// Output: onClick
const Like = ({ liked, onLike }) => {
  // let classes = "fa fa-heart";
  // if (!props.liked) classes += "-o";
  return (
    <i
      className={!liked ? "fa fa-heart-o" : "fa fa-heart"}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={onLike}
    />
  );
};

export default Like;
