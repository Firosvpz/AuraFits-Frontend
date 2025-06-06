import React from "react";

const Logo = () => {
  return (
    <>
      <div
        className="cursor-pointer hover:scale-105"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 700,
          fontSize: "1.8rem",
          color: "#FFD700",
        }}
      >
        <svg
          className="rotate-[120deg]"
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="28" width="8" height="8" rx="2" fill="#FFD700" />
          <rect x="46" y="28" width="8" height="8" rx="2" fill="#FFD700" />
          <rect x="20" y="30" width="24" height="4" rx="2" fill="#FFF500" />
          <rect x="18" y="26" width="2" height="12" rx="1" fill="#FFD700" />
          <rect x="44" y="26" width="2" height="12" rx="1" fill="#FFD700" />
        </svg>
        <span style={{ color: "#FFF500", letterSpacing: "1px" }}>
          Aura<span style={{ color: "#FFD700" }}>Fits</span>
        </span>
      </div>
    </>
  );
};

export default Logo;
