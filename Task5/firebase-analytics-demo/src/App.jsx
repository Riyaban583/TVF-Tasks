import { useEffect, useState } from "react";
import "./App.css";
import { analytics, remoteConfig } from "./firebase";

import {
  logEvent,
  setUserId,
  setUserProperties,
} from "firebase/analytics";

import {
  fetchAndActivate,
  getValue,
} from "firebase/remote-config";

function App() {
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      await fetchAndActivate(remoteConfig);

      const value = getValue(
        remoteConfig,
        "showNewUI"
      ).asBoolean();

      setShowUI(value);
    };

    loadConfig();

    setUserId(analytics, "user123");

    setUserProperties(analytics, {
      subscription: "premium",
    });
  }, []);

  const sendEvent = (eventName) => {
    logEvent(analytics, eventName);
    alert(`${eventName} Event Sent`);
  };

  return (
    <div className="container">
      <div className="dashboard">

        <h1>🔥 Firebase Analytics Dashboard</h1>
        <p className="subtitle">
          Analytics + Remote Config Demo
        </p>

        <div className="stats">
          <div className="card">
            <h3>5</h3>
            <p>Analytics Events</p>
          </div>

          <div className="card">
            <h3>1</h3>
            <p>Feature Flag</p>
          </div>

          <div className="card">
            <h3>Live</h3>
            <p>Firebase Connected</p>
          </div>
        </div>

        <div className="buttons">

          <button onClick={() => sendEvent("login")}>
            Login Event
          </button>

          <button onClick={() => sendEvent("sign_up")}>
            Signup Event
          </button>

          <button onClick={() => sendEvent("search")}>
            Search Event
          </button>

          <button onClick={() => sendEvent("page_view")}>
            Page View
          </button>

          <button onClick={() => sendEvent("button_click")}>
            Button Click
          </button>

        </div>

        {showUI && (
          <div className="feature-card">
            <h2>🚀 New UI Section</h2>

            <p>
              This section is controlled using
              Firebase Remote Config.
            </p>

            <span className="badge">
              Feature Flag Active
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;