import styled from "styled-components";
import { useRef } from "react";
import TestVideo from "./assets/test.mov";
import useVideo from "./useVideo";

const VideoContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: black;
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

export default function App() {
  return (
    <VideoContainer>
      <VideoPlayer src={TestVideo} />
      <VideoPlayer src={TestVideo} />
    </VideoContainer>
  );
}
