import { useState } from "react";
import { configureActions } from "@storybook/addon-actions/dist/preview";

export default function useVisualMode(initial, replace = false) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      history[history.length - 1] = newMode;
    } else {
      history.push(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      const lastMode = history[history.length - 1];

      setMode(lastMode);
    }
  };

  return { mode, transition, back };
}
