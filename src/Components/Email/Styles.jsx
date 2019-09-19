import styled from 'styled-components';

export const NameInput = styled.input`
  outline: none;
  background-color: #fdfdfe;
  border-color: #94b2ff;
  color: rgb(8, 8, 8);
  font-size: 16px;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  padding: 10px 12px;
  border-radius: 3px;

  &:focus {
    border-color: #4d7ff4;
    background-color: #f6f6fb;
  }
`;

export const TextArea = styled.textarea`
  outline: none;
  background-color: #fdfdfe;
  border-color: #94b2ff;
  color: rgb(8, 8, 8);
  font-size: 16px;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  padding: 10px 12px;
  border-radius: 3px;

  &:focus {
    border-color: #4d7ff4;
    background-color: #f6f6fb;
  }
`;

export const Title = styled.span`
  display: block;
  margin: 0px 0 10px;
  width: 400px;
`;

export const Content = styled.div`
  padding: 20px 0px 20px;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
`;

export const Footer = styled.div`
  background-color: #f8f8fb;
  padding: 12px 0px;
  text-align: right;
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
