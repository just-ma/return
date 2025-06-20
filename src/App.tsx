import VideoContainer from "./VideoContainer";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const OPACITY_SCROLL = 200;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  height: calc(100vh + ${OPACITY_SCROLL}px);
  width: 100vw;
  opacity: 0;
`;

export default function App() {
  const [opacity, setOpacity] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = containerRef.current?.scrollTop;
      if (scrollTop) {
        setOpacity(scrollTop / OPACITY_SCROLL);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll);
    }

    return () => {
      container?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <VideoContainer opacity={opacity} />
      <ScrollContainer />
    </Container>
  );
}
