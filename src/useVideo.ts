import { useEffect, useState } from "react";

const STATES = [
  {
    name: "hidden",
    playbackRate: 0,
  },
  {
    name: "paused",
    playbackRate: 0,
  },
  {
    name: "playing",
    playbackRate: 1,
  },
  {
    name: "slow",
    playbackRate: 0.5,
  },
];

export default function useVideo(
  ref: React.RefObject<HTMLVideoElement | null>
) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const state = STATES[Math.floor(Math.random() * STATES.length)];
      setHidden(state.name === "hidden");
      if (ref.current) {
        ref.current.playbackRate = state.playbackRate;
      }
    }, 1000);

    return () => clearInterval(id);
  }, [ref]);

  return hidden;
}
