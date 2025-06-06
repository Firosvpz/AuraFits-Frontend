import React from "react";

const SubButton = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <button
        className="relative px-7 py-4 rounded-2xl font-semibold text-sm  tracking-wider 
                    overflow-hidden  text-white
                    shadow-lg  transition-all duration-500 ease-out
                    hover:scale-105 active:scale-95"
      >
        <span className="flex items-center gap-3 relative z-10">
          <svg
            stroke="#FFD700"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              stroke-linecap="round"
              stroke-width="2"
              d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 5l2-2"
            ></path>
          </svg>
          {text}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1.5"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Background blur/glass effect */}
        <div
          className="absolute inset-0 z-0 backdrop-blur-md  rounded-2xl opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        {/* Border glow animation */}
        <div className="absolute inset-0 border border-amber-400 rounded-2xl group-hover:border-amber-300 transition-all duration-300"></div>
      </button>
    </div>
  );
};

export default SubButton;
