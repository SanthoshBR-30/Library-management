import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextbookMarketplace from "./pages/TextbookMarketplace";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextbookMarketplace />} />
      </Routes>
    </Router>
  );
};

export default App;
