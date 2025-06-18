import { useEffect, useState } from "react";

const _STATES: {
  name: string;
  playbackRate: number;
  hidden?: boolean;
  flicker?: boolean;
  frequency?: number; // 1-10, default 10
  timeout?: number; // default 1000
}[] = [
  {
    name: "hidden",
    playbackRate: 0,
    hidden: true,
  },
  {
    name: "brief-hidden",
    playbackRate: 0,
    hidden: true,
    timeout: 200,
  },
  {
    name: "briefer-hidden",
    playbackRate: 0,
    hidden: true,
    timeout: 100,
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
    timeout: 3000,
  },
  {
    name: "flicker",
    playbackRate: 0.5,
    flicker: true,
    frequency: 1,
    timeout: 500,
  },
];

const STATES = _STATES.reduce((acc, state) => {
  for (let i = 0; i < (state.frequency || 10); i++) {
    acc.push({
      hidden: !!state.hidden,
      playbackRate: state.playbackRate,
      flicker: !!state.flicker,
      timeout: state.timeout || 1000,
    });
  }
  return acc;
}, [] as { hidden: boolean; playbackRate: number; flicker: boolean; timeout: number }[]);

export default function useVideo(
  ref: React.RefObject<HTMLVideoElement | null>
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
      const state = STATES[Math.floor(Math.random() * STATES.length)];
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
