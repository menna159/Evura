import React from "react";
import "./HeartLoader.css";

const HeartLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="heart-loader-wrapper">
      <div className="heart"></div>
    </div>
  );
};

export default HeartLoader;
