import React from "react";
import "../App.css";
import { numberWithCommas } from "../utils/config";

export default function SliderInput({
  title,
  state,
  setState,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle,
}) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      {state && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}
      <div>
        <input
          type="range"
          value={state}
          onChange={onChange}
          min={min}
          max={max}
          className="slider"
        />
        <div className="labels">
          <label>{labelMin ?? numberWithCommas(min)}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </React.Fragment>
  );
}
