import React from "react";
import "./TopBar.css";
import UserMenu from "../UserMenu/UserMenu";

const TopBar = () => {
  return (
    <div className="w-full flex h-[4rem] bg-orange-300 items-center justify-center relative z-50">
      <div className="w-full max-w-8xl px-4 md:px-8 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3 min-w-fit">
          {/* Logo - always visible */}
          <div className="h-10 w-10 shrink-0">
            <img src="logo.png" alt="logo" className="object-contain" />
          </div>

          {/* PocketPal - hide on small screens */}
          <h2 className="text-xl font-bold select-none hidden sm:block">
            <span className="text-orange-600">P</span>ocket
            <span className="text-orange-600">P</span>al
          </h2>
        </div>

        {/* Right Side (Menu) */}
        <div className="relative z-50 flex items-center gap-4 pr-2">
          <div className="rounded-full bg-orange-200 h-10 w-10 flex items-center justify-center hover:bg-orange-100 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-black"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
          </div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
