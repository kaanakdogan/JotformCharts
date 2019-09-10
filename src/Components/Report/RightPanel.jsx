import React from 'react';
import * as Styles from './styles';
import Dropdown from '../Dropdown';

export default function RightPanel({
  chart, questions, setSelected, setChartType,
}) {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    const qs = questions.map((q) => q);
    setOptions(qs);
  }, [questions]);

  const onQuestionSelect = (qid) => {
    setSelected(qid);
  };

  const onChartTypeSelect = (type) => {
    setChartType(type);
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
      <Dropdown def={chart ? chart.options.type : 'Bar'} options={[{ qid: 'bar', text: 'Bar' }, { qid: 'pie', text: 'Pie' }]} onSelect={onChartTypeSelect} />

      <Dropdown def={def()} options={questions} onSelect={onQuestionSelect} />
    </div>
  );
}
