import React from "react";

const MainButton = ({ text }) => {
  return (
    <div>
      <button
        class="group relative px-10 py-5 rounded-xl bg-transparent  font-bold tracking-wider uppercase text-sm 
           transform transition-all duration-700 ease-out 
           active:scale-90 overflow-hidden before:absolute before:inset-0 before:rounded-xl before:border-2 
           before:border-[#FFD700] before:transition-all before:duration-300 hover:before:border-amber-300 hover:before:scale-110"
      >
        <span class="flex items-center text-[#FFD700] gap-3 relative z-10">
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
            stroke="#FFD700"
            fill="none"
            class="w-5 h-5 transition-transform duration-500 group-hover:translate-x-3 group-hover:scale-110"
          >
            <path
              d="M5 12h12m-5-5l7 7-7 7"
              stroke-width="2.5"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </span>
        <div class="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 "></div>
        <div class="absolute -left-full top-0 h-full w-full group-hover:translate-x-[200%] transition-transform duration-600 ease-out"></div>
      </button>
    </div>
  );
};

export default MainButton;
