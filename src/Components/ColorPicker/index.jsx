import React from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  const str1 = JSON.stringify(array1);
  const str2 = JSON.stringify(array2);
  if (str1 === str2) {
    return false;
  }

  console.log({ arr1: JSON.stringify(array1), arr2: JSON.stringify(array2) });

  return true;
}

export default function ColorPicker({ isMultiple, colors, onColorsChange }) {
  const [cols, setCols] = React.useState(colors);
  const [active, setActive] = React.useState(false);
  const eventRef = React.useRef(null);

  React.useEffect(() => onColorsChange(cols), [cols]);
  React.useEffect(() => {
    if (compareArrays(colors, cols)) {
      setCols(colors);
    }
  }, [colors]);

  const addNewColor = () => {
    const newCols = [...cols];
    newCols.push('#fff');
    setCols(newCols);
  };

  const openColorPicker = (index) => {
    setActive(index);
  };

  const handleClickOutside = (e) => {
    if (eventRef.current && !eventRef.current.contains(e.target)) {
      setActive(false);
    }
  };

  const handleChange = (col) => {
    const newCols = [...cols];
    newCols[active] = col;
    setCols(newCols);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={eventRef}>

      <FlexWrapper>
        {isMultiple
          ? (
            <>
              {cols.map((c, index) => (
                <Color color={c} index={index} onClick={openColorPicker} />
              ))}
              <AddButton onClick={addNewColor}>+</AddButton>
            </>
          )
          : (
            <>
              <Color color={cols[0]} index={0} onClick={openColorPicker} />
            </>
          )}

      </FlexWrapper>
      {(active !== false ? <Picker color={cols[active]} onColorChange={handleChange} /> : null)}
    </div>
  );
}

function Color({
  color, onClick, index,
}) {
  const handleClick = () => {
    console.log(index);
    onClick(index);
  };
  return <ColorDiv color={color} onClick={handleClick} />;
}

function Picker({ color, onColorChange }) {
  const handleChangeComplete = (col, event) => {
    console.log(col);
    const toRet = `rgba(${col.rgb.r}, ${col.rgb.g}, ${col.rgb.b}, ${col.rgb.a})`;
    onColorChange(toRet);
  };
  return (
    <PickerDiv>
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
    </PickerDiv>
  );
}

const PickerDiv = styled.div`
position: absolute;
`;

const AddButton = styled.div`
  width: 26px;
  height: 26px;
  margin 10px;
  background: #19613D;
  color: #fff;
  border-radius: 10%;
  font-size: 20px;
  text-align: center;
`;

const ColorDiv = styled.div`
width: 26px;
height: 26px;
margin 10px;
background: ${(props) => props.color};
color: #fff;
border-radius: 10%;
font-size: 20px;
text-align: center;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;
