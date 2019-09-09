import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BarChart from './BarChart';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import Logo from '../../opt.svg';
import mapQuestionAnswers from './Utils';
import { FormDataContext } from '../../Contexts/FormsContext';

export default function ChartController({
  children, onClick, index, setPanel, opts,
}) {
  const [submissions] = React.useContext(SubmissionsContext);
  const [formData] = React.useContext(FormDataContext);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    console.log({ submissions });
    const a = submissions.reduce(mapQuestionAnswers(opts.qid, formData.id), []);
    setData(a);
  }, [opts.qid]);

  const handleClick = (e) => {
    onClick(index);
  };

  return (
    <>
      {children && children.length !== 0 ? <Toolbox setPanel={setPanel} /> : null}
      <BarChart onClick={handleClick} data={data} title="Single Choice" color="#70CAD1" />
    </>
  );
}

function Toolbox({ setPanel }) {
  const handleClick = () => {
    setPanel();
  };

  return (
    <Options>
      <Wrapper onClick={handleClick}>
        <Img src={Logo} />
      </Wrapper>
    </Options>
  );
}

const Img = styled.img`
  height: 15px;
`;

const Wrapper = styled.div`
padding 5px;
`;

const Open = keyframes`
0% {
  right: 0;
  opacity: 0;
}

50% {
  opacity: 0;
}
100% {
  right: -35px;
  opacity: 1;
}
`;

const Options = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 0;
  height: auto;
  background-color: rgb(76, 127, 244);
  cursor: default;
  z-index: 1;
  padding: 5px 0px;
  border-radius: 4px;
  animation: ${Open} 0.2s ease 0s 1 normal forwards running;
`;
