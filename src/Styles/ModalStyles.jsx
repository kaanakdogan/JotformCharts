import styled, { createGlobalStyle } from 'styled-components'

export const Root = styled.div`
  
  position: relative;
  z-index: 999;
`

export const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
    font-family: Circular Std Book,-apple-system,blinkmacsystemfont,Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif;
  }
`

export const ModalDiv = styled.div`
padding: 15px;
background: rgba(255, 255, 255, 0.97);
position: fixed;
overflow: auto;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 11;
padding: 32px;
text-align: center;
`
export const FormListHeader = styled.div`
  padding-top: 135px;
  transition: .4s;
  left: 0;
  pointer-events: none;
  top: 0;
  width: 100%;
  margin-bottom: 32px;
`

export const FormListContainer = styled.div`
  margin-top: 30px;
  max-width: 600px;
  margin: auto;
  width: 100%;
`

export const FormListItem = styled.a`
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
`

export const ItemContent = styled.div`
  text-align: left;
  flex-grow: 1;
  color: #2b3245;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
`

export const ItemTitle = styled.h2`
  margin: 0;
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: 400;
`

export const ItemDesc = styled.p`
  margin: 0;
  color: rgba(43, 50, 69, 0.5);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const ItemLabels = styled.div`
  text-align: right;
  vertical-align: middle;
  flex-shrink: 0;
  margin-left: 5px;
`
