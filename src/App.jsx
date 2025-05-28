import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Footer from "./components/Footer";
import NotFound from "./pages/Notfound";
import Home from "./pages/Home";
import Hero from "./pages/Hero";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Hero />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
