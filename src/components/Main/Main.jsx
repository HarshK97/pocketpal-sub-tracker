import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import ServiceInfo from "../ServiceInfo/ServiceInfo";

const Main = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-8xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
      <ServiceInfo />
    </div>
  );
};

export default Main;
