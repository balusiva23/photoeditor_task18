import React from "react";
import "./slider.css";

const Slider = ({ min, max, value, handleChange }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider"
        min={min}
        value={value}
        max={max}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
