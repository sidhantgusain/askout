import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { YesPage } from "./pages/YesPage";

export const App = () => {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/yes" element={<YesPage />} />
      </Routes>
    </div>
  );
};

