import styled from 'styled-components';

export const Nav = styled.div`
  background-color: rgb(49, 97, 207);
  border-bottom: 1px solid #254db3;
`;

export const NavHeader = styled.div`
  padding: 26px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const NavLeft = styled.div`
  width: 33.333%;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 21px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  cursor: pointer;
  isplay: inline-block;
  vertical-align: middle;
  color: #FFFFFF;
`;

export const Img = styled.img`
  height: 45px;
`;

export const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;

export const NavRight = styled.div`
  width: 33.333%;
  text-align: center;

  svg {
    margin-right: 20px;
  }
`;
