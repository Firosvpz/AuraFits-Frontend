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
        <img src="/assets/c.png" className="md:h-[160px] md:w-auto h-[100px] w-[100px]"/>
        
      </div>
    </>
  );
};

export default Logo;
