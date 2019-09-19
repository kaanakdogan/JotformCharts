import styled from 'styled-components';

export const DocArea = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

export const LayoutDiv = styled.div`
  min-width: 800px;
  margin: 0 auto;
  position: relative;
`;


export const Button = styled.button`
  font-family: "Circular Std Book", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  opacity: 1;
  pointer-events: inherit;
  background-color: rgb(1, 189, 111);
  color: rgb(255, 255, 255);
  width: unset;
  user-select: none;
  display: inline-flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  vertical-align: middle;
  padding: 9px 12px;
  border-radius: 4px;
  border-width: 4px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  transition: all 0.15s ease 0s;
  outline: none;
`;

export const ButtonWrapper = styled.div`
margin:10px;
display: flex;
justify-content:center;
`;
