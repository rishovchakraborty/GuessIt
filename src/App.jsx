import { Routes, Route, Navigate } from "react-router-dom";
import Playgame from "./pages/Playgamepage/playgame";
import Startgame from "./pages/Startgamepage/startgame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/start" replace />} />
      <Route path="/start" element={<Startgame />} />
      <Route path="/play" element={<Playgame />} />
      <Route path="*" element={<Navigate to="/start" replace />} />
    </Routes>
  );
}

export default App;
