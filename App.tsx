import React, { useState } from "react";
import Home from "./src/Home"
import Chart from "./src/Chart"

const App = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  return currentPage === "Home" ? (
    <Home
      setCurrentPage={page => {
        console.log(page);
        setCurrentPage(page);
      }}
    />
  ) : (
    <Chart
      setCurrentPage={page => {
        console.log(page);
        setCurrentPage(page);
      }}
    />
  );
};

export default App;
