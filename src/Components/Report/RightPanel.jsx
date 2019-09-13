import React from 'react';
import * as Styles from './styles';
import { FormDataContext } from '../../Contexts/FormsContext';
import Dropdown from '../Dropdown';
import ColorPicker from '../ColorPicker';

export default function RightPanel({
  chart, setSelected, setChartType, setDataType, setColors,
}) {
  const [options, setOptions] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [data] = React.useContext(FormDataContext);

  React.useEffect(() => {
    if (chart) {
      if (chart.options.dataType == 3 || chart.options.dataType == 4) {
        const qs = data.questions.filter((q) => q.type === 'control_rating'
        || q.type === 'control_number');

        console.log(qs);
        setQuestions(qs);
      } else if (chart.options.dataType == 2) {
        setQuestions(null);
      } else {
        const qs = data.questions.filter((q) => q.type === 'control_datetime'
      || q.type === 'control_time' || q.type === 'control_dropdown'
      || q.type === 'control_radio' || q.type === 'control_checkbox'
      || q.type === 'control_rating' || q.type === 'control_number');

        setQuestions(qs);
      }
    } else {
      const qs = data.questions.filter((q) => q.type === 'control_datetime'
      || q.type === 'control_time' || q.type === 'control_dropdown'
      || q.type === 'control_radio' || q.type === 'control_checkbox'
      || q.type === 'control_rating' || q.type === 'control_number');

      setQuestions(qs);
    }
  }, [chart]);

  React.useEffect(() => {
    const qs = questions;
    setOptions(qs);
    console.log(qs);
  }, [questions]);

  const onQuestionSelect = (qid) => {
    setSelected(qid);
  };

  const onChartTypeSelect = (type) => {
    setChartType(type);
  };

  const onDataTypeSelect = (type) => {
    setDataType(type);

    if (type == 3 || type == 4) {
      const qs = data.questions.filter((q) => q.type === 'control_rating'
      || q.type === 'control_number');

      console.log(qs);
      setQuestions(qs);
    } else if (type == 2) {
      setQuestions(null);
    } else {
      const qs = data.questions.filter((q) => q.type === 'control_datetime'
        || q.type === 'control_time' || q.type === 'control_dropdown'
        || q.type === 'control_radio' || q.type === 'control_checkbox'
        || q.type === 'control_rating' || q.type === 'control_number');

      setQuestions(qs);
    }
  };

  const typeOptions = [{ qid: 'bar', text: 'Bar' }, { qid: 'pie', text: 'Pie' }, { qid: 'line', text: 'Line' }];

  const dataOptions = [{
    qid: '1',
    text: 'All answers for a Field',
  }, {
    qid: '2',
    text: 'Submission Count Per Day',
  }, {
    qid: '3',
    text: 'Avarage of answers for a field per day',
  }, {
    qid: '4',
    text: 'Highest of answers for a field per day',
  }];

  const def = () => {
    if (chart && chart.options) {
      return typeOptions.find((d) => d.qid === chart.options.type).text;
    }

    return 'Bar';
  };

  const def2 = () => {
    if (chart && chart.options.dataType) {
      return dataOptions.find((d) => d.qid === chart.options.dataType).text;
    }

    return 'All answers for a Field';
  };

  const def3 = () => {
    if (chart && chart.options) {
      const ret = questions.find((q) => q.qid === chart.options.qid);
      if (ret) {
        return ret.text;
      }

      setSelected(questions[0].qid);
      return questions[0].text;
    }
    return questions.map((q) => q.text)[0];
  };

  const def4 = () => {
    if (chart && chart.options) {
      return chart.options.colors;
    }

    return ['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'];
  };

  return (
    <div style={{ width: '100%' }}>
      <p>Chart Options</p>
      <Dropdown def={def()} options={typeOptions} onSelect={onChartTypeSelect} />
      <Dropdown def={def2()} options={dataOptions} onSelect={onDataTypeSelect} />
      {questions ? <Dropdown def={def3()} options={questions} onSelect={onQuestionSelect} /> : null}
      <ColorPicker isMultiple={chart && chart.options.type === 'pie'} colors={def4()} onColorsChange={setColors} />
    </div>
  );
}

// All answers for a Field,
// Submission Count Per Day,
// Avarage of answers for a field per day
// Highest of answers for a field per day
