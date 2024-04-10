import React from "react";
import "../App.css";
export default function TextInput({ title, state, setState }) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <input
        max="100"
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </React.Fragment>
  );
}
