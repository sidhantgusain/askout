import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gifs, messages, yesClickService } from "../config";

type Position = {
  top: number;
  left: number;
};

const getRandomViewportPosition = (button: HTMLElement): Position => {
  const buttonRect = button.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const safeMargin = 8;
  const maxLeft = Math.max(safeMargin, viewportWidth - buttonRect.width - safeMargin);
  const maxTop = Math.max(safeMargin, viewportHeight - buttonRect.height - safeMargin);

  const left = Math.random() * (maxLeft - safeMargin) + safeMargin;
  const top = Math.random() * (maxTop - safeMargin) + safeMargin;

  return { top, left };
};

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState<Position | null>(null);

  const handleNoHover = useCallback(() => {
    if (!noButtonRef.current) return;
    const next = getRandomViewportPosition(noButtonRef.current);
    setNoButtonPosition(next);
  }, []);

  const handleYesClick = useCallback(async () => {
    const clickedAt = new Date().toISOString();
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name") || undefined;

    if (yesClickService.endpoint) {
      try {
        const response = await fetch(yesClickService.endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message : `${name} said yes at ${clickedAt}.`,
          }),
        });
        console.log("Yes-click webhook response", response.status);
      } catch (error) {
        // Intentionally ignore network errors so the UI still navigates.
        // You can inspect the console during testing if needed.
        console.error("Failed to notify yes-click service", error);
      }
    }

    navigate("/yes", { replace: true, state: { clickedAt, name } });
  }, [location.search, navigate]);

  return (
    <main className="page-root">
      <div className="card">
        <header className="card-header">
          <h1 className="title">{messages.title}</h1>
          <p className="subtitle">{messages.subtitle}</p>
        </header>

        <div className="gif-wrapper">
          <img src={gifs.home} alt="Cute invitation" className="gif" />
        </div>

        <div className="buttons-area buttons-row-main">
          <button type="button" className="btn btn-primary" onClick={handleYesClick}>
            {messages.yesButton}
          </button>

          <button
            type="button"
            className="btn btn-ghost evasive-button"
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            style={
              noButtonPosition
                ? {
                    position: "fixed",
                    top: `${noButtonPosition.top}px`,
                    left: `${noButtonPosition.left}px`,
                    zIndex: 20,
                  }
                : undefined
            }
          >
            {messages.noButton}
          </button>
        </div>
      </div>
    </main>
  );
};

