type StateBuilder = {
  name: string;
  playbackRate?: number; // default 1
  hidden?: boolean; // default false
  flicker?: boolean; // default false
  frequency?: number; // 1-10, default 10
  timeout?: number; // default 1000
};

type State = {
  hidden: boolean;
  playbackRate: number;
  flicker: boolean;
  timeout: number;
};

const CALM_STATES: StateBuilder[] = [
  {
    name: "hidden",
    hidden: true,
    timeout: 800,
  },
  {
    name: "brief-hidden",
    hidden: true,
    timeout: 200,
  },
  {
    name: "paused",
    playbackRate: 0,
    timeout: 2000,
  },
  {
    name: "biref-paused",
    playbackRate: 0,
    timeout: 500,
  },
  {
    name: "playing",
    timeout: 2000,
  },
  {
    name: "slow",
    playbackRate: 0.5,
    timeout: 2000,
  },
];

const DEFAULT_STATES: StateBuilder[] = [
  {
    name: "hidden",
    hidden: true,
    timeout: 800,
  },
  {
    name: "brief-hidden",
    hidden: true,
    timeout: 200,
  },
  {
    name: "briefer-hidden",
    hidden: true,
    timeout: 100,
  },
  {
    name: "paused",
    playbackRate: 0,
  },
  {
    name: "playing",
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

const EXCITED_STATES: StateBuilder[] = [
  {
    name: "hidden",
    hidden: true,
    timeout: 300,
  },
  {
    name: "brief-hidden",
    hidden: true,
    timeout: 200,
  },
  {
    name: "briefer-hidden",
    hidden: true,
    timeout: 100,
  },
  {
    name: "paused",
    playbackRate: 0,
    timeout: 500,
  },
  {
    name: "brief-paused",
    playbackRate: 0,
    timeout: 200,
  },
  {
    name: "playing",
    timeout: 500,
  },
  {
    name: "fast",
    playbackRate: 2,
    frequency: 5,
    timeout: 500,
  },
  {
    name: "slow flicker",
    playbackRate: 0.5,
    flicker: true,
    frequency: 5,
    timeout: 500,
  },
  {
    name: "fast flicker",
    playbackRate: 2,
    flicker: true,
    frequency: 5,
    timeout: 500,
  },
];

const STATES_BUILDER = {
  1: CALM_STATES,
  2: DEFAULT_STATES,
  3: EXCITED_STATES,
};

export const STATES = Object.entries(STATES_BUILDER).reduce(
  (agg, [name, states]) => {
    agg[name] = states.reduce((acc, state) => {
      for (let i = 0; i < (state.frequency || 10); i++) {
        acc.push({
          hidden: !!state.hidden,
          playbackRate: state.playbackRate ?? 1,
          flicker: !!state.flicker,
          timeout: state.timeout || 1000,
        });
      }
      return acc;
    }, [] as State[]);
    return agg;
  },
  {} as Record<string, State[]>
);
