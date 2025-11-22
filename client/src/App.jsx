import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/homepage";
import Auth from "./pages/Auth/Auth";
import VotingPage from "./pages/Voting/Voting_pg";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/voting" element={<VotingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
