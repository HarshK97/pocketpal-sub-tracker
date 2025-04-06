import React from "react";
import "./App.css";
import TopBar from "./components/TopBar/TopBar.jsx";
import Main from "./components/Main/Main.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-orange-100 text-white overflow-x-hidden">
      <TopBar />
      <Main />
    </div>
  );
};

export default App;
