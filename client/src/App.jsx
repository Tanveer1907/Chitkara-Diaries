
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/homepage";
import Auth from "./pages/Auth/Auth";
import VotingPg from "./pages/Voting/Voting_pg";
import Osc from "./pages/Osc/osc";
import Ieee from "./pages/Ieee/ieee";
import Cricket from "./pages/Cricket/cricket";
import Basketball from "./pages/Basketball/basketball";
import Panache from "./pages/Panache/panache";
import Clubs from "./pages/Clubs/clubs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/voting" element={<VotingPg />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/osc" element={<Osc />} />
        <Route path="/ieee" element={<Ieee />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/panache" element={<Panache />} />
        <Route path="/clubs" element={<Clubs />} />
      </Routes>
    </BrowserRouter>
  );
}
