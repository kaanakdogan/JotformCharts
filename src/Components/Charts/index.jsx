import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BarChart from './BarChart';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import Logo from '../../opt.svg';

function mapQuestionAnswers(qid) {
  return function reducer(array, current) {
    if (!array) {
      array = [];
    }

    if (array.filter((o) => o.label === current.answers[qid].answer).length !== 0) {
      array.map((cur) => {
        if (cur.label === current.answers[qid].answer) {
          return cur.value++;
        }
        return cur;
      });

      return array;
    }

    array.push({
      label: current.answers[qid].answer,
      value: 1,
    });
    return array;
  };
}

export default function ChartController({
  children, onClick, index, setPanel, opts,
}) {
  const [submissions] = React.useContext(SubmissionsContext);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    console.log('here');
    const a = submissions.reduce(mapQuestionAnswers(opts.qid), []);
    console.log(a);
    setData(a);
  }, [opts.qid]);

  const handleClick = (e) => {
    console.log('Click from chart controller');
    onClick(index);
  };

  return (
    <>
      {console.log(opts.qid)}
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
