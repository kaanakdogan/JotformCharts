import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
width: 100%;
border-radius: 3px;
background-color: #415276;
border: 1px solid #111b31;
position: relative;
`;

export const ToggleBttn = styled.div`
  text-align: center;
  cursor: pointer;
  -webkit-transition: color .3s;
  transition: color .3s;
  display: block;
`;

export const openAnim = keyframes`
0% {
  max-height: 0;
}
100% {
  max-height: 300px;
}
`;

export const ToggleContent = styled.span`
width: 100%;
text-align: left;
padding: 8px 38px 8px 8px;

display: inline-block;
max-width: 100%;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
vertical-align: middle;
font-size: 16px;
margin: 0;
position: relative;
`;

export const DropviewContent = styled.div`
  position: absolute;
  width: 100%;
  overflow-y: auto;
  border-radius: 5px;
  z-index: 15;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  right: 0px;
  animation: ${openAnim} .25s ease forwards;
`;

export const DropviewList = styled.ul`
list-style: none;
margin: 0;
padding: 0;
`;

export const DropviewListItem = styled.li.attrs((props) => ({
  key: props.key,
}))`
cursor: pointer;
color: #000;
text-align: left;
padding: 6px 10px;
font-size: 14px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`;
