import { useState } from "react";

export default function useVisualMode(initial, replace = false) {
  const [mode, setMode] = useState(initial);
  //history keeps track of previous modes to be able to go back
  const [history, setHistory] = useState([initial]);
  //transitioning to the desired mode unless need to go back two steps to bypass confirmation messages
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      const newHistory = [...history];
      newHistory[newHistory.length - 1] = newMode;
      setHistory(newHistory);
    } else {
     
      const newHistory = [...history,newMode];
      setHistory(newHistory);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);

      const lastMode = newHistory[newHistory.length - 1];

      setMode(lastMode);
    }
  };

  return { mode, transition, back };
}
