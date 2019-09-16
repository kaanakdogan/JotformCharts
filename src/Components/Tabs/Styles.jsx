import styled from 'styled-components';

export const tabList = styled.div`
  padding-left: 0;
  background-color: #254db3;
  margin: 0;
`;

export const tabItem = styled.div`
  display: inline-block;
  position: relative;
  background-color: #3161cf;
  border-radius: 4px 4px 0 0;
  transition: background-color .3s;
  vertical-align: middle;
  margin-left: 9px;

  a {
  color: white;
  padding-right: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-decoration: none;
  }
`;

export const RouterLink = styled.a`
vertical-align: middle;
padding: 10px;
outline: none;
font-size: 16px;
overflow: hidden;
text-decoration: none;
border-radius: 5px 5px 0 0;
border: 0;
cursor: pointer;
max-width: 150px;
background-color: transparent;
color: #fff;
padding: 10px 15px;
`;

export const p = styled.div`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
border-color: transparent;
outline: none;
min-width: 20px;
`;

export const EditableWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  ${p} {
    outline: none;
    min-width: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-color: transparent;
  }
`;

export const dropToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
  background-color: transparent;
`;

export const Img = styled.img`
  margin: 0 12px;

  height: 17px;
`;

export const tabItemActive = styled(tabItem)`
  
  padding-right: 28px;
  background-color: #fff;

  a {
    color:#1f2229;
  }
`;

export const tabsWrapper = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
  margin-top: 6px;
`;

export const DropviewWrapper = styled.div`
  position: fixed;
  background-color: transparent;
  box-shadow: none;
  padding: 8px;
  z-index: 2;

  ::before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    left: 15px;
    top: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #1c2843;
    z-index: 2;
  }
`;

export const DropviewContent = styled.div`
  padding: 10px 5px;
  background-color: #1c2843;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
`;
