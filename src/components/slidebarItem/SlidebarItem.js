import React from "react";
import "./slidebarItem.css";

const SlidebarItem = ({ name, active, handleClick }) => {
  return (
    <button
      className={`sidebar-item ${active ? "active" : null}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default SlidebarItem;
