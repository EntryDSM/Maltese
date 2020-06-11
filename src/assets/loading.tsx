import React from "react";

function Loading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "rgb(253, 253, 253)",
        WebkitAnimationPlayState: "running",
        animationPlayState: "running",
        WebkitAnimationDelay: "0s",
        animationDelay: "0s",
      }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="#62d3e8"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="10"
        style={{
          WebkitAnimationPlayState: "running",
          animationPlayState: "running",
          WebkitAnimationDelay: "0s",
          animationDelay: "0s",
        }}
        transform="rotate(39.428 50 50)"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  );
}

export default Loading;
