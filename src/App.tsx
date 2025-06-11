import styled from "styled-components";
import { useRef, useEffect } from "react";
import TestVideo from "./assets/test.mov";

const VideoContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Video = styled.video`
  flex: 1 0;
  width: 0;
  height: 100%;
  object-fit: cover;
`;

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <Video ref={videoRef} src={src} controls={false} autoPlay loop muted />
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
