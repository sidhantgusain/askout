import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gifs, messages } from "../config";

type LocationState = {
  clickedAt?: string;
};

const formatTimestamp = (iso?: string) => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
};

export const YesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as LocationState | null) || {};

  const formatted = formatTimestamp(state.clickedAt);
  const colors = useMemo(
    () => ["#f97316", "#ec4899", "#22c55e", "#3b82f6", "#eab308", "#6366f1"],
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const layer = document.getElementById("confetti-layer");
      if (layer) {
        layer.innerHTML = "";
      }
    }, 3200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div id="confetti-layer" className="confetti-layer">
        {Array.from({ length: 80 }).map((_, index) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 0.8;
          const duration = 2.2 + Math.random() * 1;
          const background = colors[index % colors.length];
          return (
            <div
              key={index}
              className="confetti-piece"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                background,
              }}
            />
          );
        })}
      </div>
      <main className="page-root">
        <div className="card">
          <header className="card-header">
            <h1 className="title">{messages.yesPageTitle}</h1>
            <p className="subtitle">{messages.yesPageSubtitle}</p>
          </header>

          <div className="gif-wrapper">
            <img src={gifs.yes} alt="Celebration" className="gif" />
          </div>

          <div className="buttons-area">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/", { replace: true })}
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

