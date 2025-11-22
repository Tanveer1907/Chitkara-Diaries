import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/homepage";
import Auth from "./pages/Auth/Auth";
import Osc from "./pages/osc/osc";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/osc" element={<Osc />} />
      </Routes>
    </BrowserRouter>
  );
}