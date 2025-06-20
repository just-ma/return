import { useEffect, useState } from "react";
import { STATES } from "./states";

export default function useVideo(
  ref: React.RefObject<HTMLVideoElement | null>,
  stateNameRef: React.RefObject<number>
) {
  const [hidden, setHidden] = useState(true);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    let id: number | undefined;
    if (flicker) {
      id = setInterval(() => {
        setHidden((prev) => !prev);
      }, 40);
    }

    return () => {
      clearInterval(id);
    };
  }, [flicker]);

  useEffect(() => {
    let id: number | undefined;
    const callback = () => {
      const states = STATES[stateNameRef.current];
      const state = states[Math.floor(Math.random() * states.length)];
      setHidden(state.hidden);
      setFlicker(state.flicker);
      if (ref.current) {
        ref.current.playbackRate = state.playbackRate;
      }
      id = setTimeout(callback, state.timeout + Math.random() * 500);
    };

    callback();

    return () => clearTimeout(id);
  }, [ref]);

  return hidden;
}
