import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useVideo from "./useVideo";
import PlaneNightVideo from "./assets/plane-night.mov";
import SeagullsVideo from "./assets/seagulls.mov";
import WindTurbineVideo from "./assets/wind-turbine.mov";
import YellowFieldVideo from "./assets/yellow-field.mov";

const VIDEOS = [
  PlaneNightVideo,
  SeagullsVideo,
  WindTurbineVideo,
  YellowFieldVideo,
];
export const NUM_VIDEOS = VIDEOS.length;
const easeOutSine = (x: number) => Math.sin((x * Math.PI) / 2);

const Container = styled.div<{ opacity: number }>`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: ${({ opacity }) => Math.min(opacity, 0.99)};
`;

const Video = styled.video<{ $hidden: boolean }>`
  flex: 1 0;
  width: 0;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
`;

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const hidden = useVideo(videoRef);

  return (
    <Video
      ref={videoRef}
      src={src}
      controls={false}
      autoPlay
      loop
      muted
      $hidden={hidden}
    />
  );
};

export default function VideoContainer({
  index,
  opacity,
}: {
  index: number;
  opacity: number;
}) {
  const [dimmed, setDimmed] = useState(true);

  useEffect(() => {
    let id: number | undefined;
    if (opacity !== 1) {
      id = setInterval(() => {
        setDimmed((prev) => !prev);
      }, 40);
    }

    return () => {
      clearInterval(id);
    };
  }, [opacity === 1]);

  return (
    <Container opacity={dimmed ? easeOutSine(opacity) : opacity}>
      <VideoPlayer src={VIDEOS[Math.floor(index / 2)]} />
      <VideoPlayer
        src={
          VIDEOS[index === NUM_VIDEOS * 2 - 1 ? 0 : Math.floor((index + 1) / 2)]
        }
      />
    </Container>
  );
}
