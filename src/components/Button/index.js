import React from "react";
import "./styles.css";

function Button({ title, type, onClick, size }) {
  return (
    <button
      type="button"
      className={`${type === "filled" ? "btn-fill" : "btn-outline"} ${size === "large" ? "large" : "normal"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
