import styled from 'styled-components';

export const Item = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 16px;
  background: #f5f5f7;
  border-radius: 4px;
  border: 1px solid #ced0d3;
  cursor: pointer;
  transition: border 0.3s ease 0s;
  text-decoration: none;
  margin-top: 16px;

  :hover {
    border-color: #4277ff;
  }
`;

export const ItemContent = styled.div`
  text-align: left;
  flex-grow: 1;
  color: #2b3245;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
`;

export const ItemTitle = styled.h2`
  margin: 0;
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: 400;
`;

export const ItemDesc = styled.p`
  margin: 0;
  color: rgba(43, 50, 69, 0.5);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ItemLabels = styled.div`
  text-align: right;
  vertical-align: middle;
  flex-shrink: 0;
  margin-left: 5px;
`;
