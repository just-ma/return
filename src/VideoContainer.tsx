import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useVideo from "./useVideo";
import { VIDEOS, NUM_VIDEOS } from "./videos";

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

const VideoPlayer = ({
  src,
  stateNameRef,
}: {
  src: string;
  stateNameRef: React.RefObject<number>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const hidden = useVideo(videoRef, stateNameRef);

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

export default function VideoContainer({ opacity }: { opacity: number }) {
  const stateNameRef = useRef(2);

  const [dimmed, setDimmed] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          setIndex((prev) => (prev - 1) % NUM_VIDEOS);
          break;
        case "ArrowRight":
          setIndex((prev) => (prev + 1) % NUM_VIDEOS);
          break;
        case "1": {
          stateNameRef.current = 1;
          break;
        }
        case "2": {
          stateNameRef.current = 2;
          break;
        }
        case "3": {
          stateNameRef.current = 3;
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
      <VideoPlayer
        src={VIDEOS[Math.floor(index / 2)]}
        stateNameRef={stateNameRef}
      />
      <VideoPlayer
        src={VIDEOS[Math.floor((index + 1) / 2)]}
        stateNameRef={stateNameRef}
      />
    </Container>
  );
}
