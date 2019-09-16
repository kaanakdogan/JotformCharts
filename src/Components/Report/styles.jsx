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
