import styled, { keyframes } from 'styled-components';

export const Img = styled.img`
  height: 15px;
`;

export const Wrapper = styled.div`
  padding 5px;
  text-align: center;
  cursor: pointer;
`;

export const Open = keyframes`
  0% {
    right: 0;
    opacity: 0;
  }

  50% {
    opacity: 0;
  }
  100% {
    right: -35px;
    opacity: 1;
  }
`;

export const Options = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 0;
  height: auto;
  background-color: rgb(76, 127, 244);
  cursor: default;
  z-index: 1;
  padding: 5px 0px;
  border-radius: 4px;
  animation: ${Open} 0.2s ease 0s 1 normal forwards running;
`;

export const ChartDiv = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
