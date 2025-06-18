import { useState, useRef } from "react";
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

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Video = styled.video<{ $hidden: boolean }>`
  flex: 1 0;
  width: 0;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
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

export default function VideoContainer() {
  const [index, setIndex] = useState(0);

  return (
    <Container onClick={() => setIndex((index + 1) % (VIDEOS.length * 2))}>
      <VideoPlayer src={VIDEOS[Math.floor(index / 2)]} />
      <VideoPlayer
        src={
          VIDEOS[
            index === VIDEOS.length * 2 - 1 ? 0 : Math.floor((index + 1) / 2)
          ]
        }
      />
    </Container>
  );
}
