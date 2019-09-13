import styled from 'styled-components';

export const tabList = styled.ol`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`;

export const tabItem = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
`;

export const tabItemActive = styled(tabItem)`
  background-color: white;
  border: solid #ccc;
  border-width: 1px 1px 0 1px;
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
