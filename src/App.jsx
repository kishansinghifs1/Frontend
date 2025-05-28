import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Footer from "./components/Footer";
import NotFound from "./pages/Notfound";
import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Statistics from "./pages/Statistics";
import { ProtectedRoute } from "./userAuth/ProtectedRoute";

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Hero />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stat"
          element={
            <ProtectedRoute requiredRole="SUPER_ADMIN">
              <Statistics />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
      <Footer />
    </>
  );
}

export default App;
