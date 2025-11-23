// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/homepage";
import Auth from "./pages/Auth/Auth";
import VotingPg from "./pages/Voting/Voting_pg"; // <-- add this import
import Osc from "./pages/Osc/osc";
import Ieee from "./pages/Ieee/ieee";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/voting" element={<VotingPg />} />   {/* <-- add this route */}
        <Route path="/*" element={<HomePage />} />
        <Route path="/osc" element={<Osc />} />
        <Route path="/ieee" element={<Ieee />} />
        
      </Routes>
    </BrowserRouter>
  );
}
