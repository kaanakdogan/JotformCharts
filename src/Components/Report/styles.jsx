import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
`;

export const MainItem = styled.div`
  flex: 1 1;
  order: 1;
  user-select: none;
  position: relative;
  max-width: 100%;
  height: 100%;
  background-color: #e7e7e7;
`;

export const RightItem = styled.div`
  flex: 1 1;
  max-width: ${(props) => (props.isVisible ? '360px' : '0px')};
  display:${(props) => (props.isVisible ? 'block' : 'none')}
  order: 2;
  color: #fff;
  background-color: #1c2843;
  box-shadow: -5px 0 9px 0 rgba(0,0,0,.2);
`;

export const DocMain = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 171px);
  transition: height .3s;
`;

export const RightPanelWrapper = styled.div`
  display:flex,
  flex-direction: column;
`;

export const RightPanelItem = styled.div`
  padding: 0 15px 15px 15px;
`;

export const RightPanelHeader = styled.div`
`;

export const Button = styled.button`
  font-family: "Circular Std Book", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  margin-left: 15px;
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
justify-content:flex-start;
`;
