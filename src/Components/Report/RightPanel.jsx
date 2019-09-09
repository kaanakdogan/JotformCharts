import React from 'react';
import * as Styles from './styles';
import Dropdown from '../Dropdown';

export default function RightPanel({ chart, questions, setSelected }) {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    const qs = questions.map((q) => q);
    setOptions(qs);
  }, [questions]);

  const onSelect = (qid) => {
    setSelected(qid);
  };

  const def = () => {
    if (chart && chart.options) {
      return questions.find((q) => q.qid === chart.options.qid).text;
    }
    return questions.map((q) => q.text)[0];
  };

  return (
    <div style={{ width: '100%' }}>
      <p>Chart Options</p>
      <Dropdown def={def()} options={questions} onSelect={onSelect} />
    </div>
  );
}
