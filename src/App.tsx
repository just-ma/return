import VideoContainer from "./VideoContainer";
import styled from "styled-components";

const ScrollContainer = styled.div`
  display: flex;
  height: 1000vh;
  width: 100vw;
  opacity: 0;
`;

export default function App() {
  return (
    <>
      <VideoContainer />
      <ScrollContainer />
    </>
  );
}
