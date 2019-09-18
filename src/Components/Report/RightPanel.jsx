/* eslint-disable react/prop-types */
import React from 'react';
import * as Styles from './styles';
import { FormDataContext } from '../../Contexts/FormsContext';
import Dropdown from '../Dropdown';
import ColorPicker from '../ColorPicker';

const standardOptions = [{
  qid: '1',
  text: 'Submission Count / Question',
}, {
  qid: '2',
  text: 'Submission Count / Date',
}, {
  qid: '3',
  text: 'Average / Date',
}, {
  qid: '4',
  text: 'Highest / Date',
}];

const typeOptions = [
  { qid: 'bar', text: 'Bar' },
  { qid: 'pie', text: 'Pie' },
  { qid: 'line', text: 'Line' }];

const stdTypeCondition = (type) => {
  if (type === 'control_datetime' || type === 'control_time' || type === 'control_dropdown'
  || type === 'control_radio' || type === 'control_checkbox' || type === 'control_rating'
  || type === 'control_number') {
    return true;
  }
  return false;
};


export default function RightPanel({
  chart, setSelected, setChartType, setDataType, setColors, setChecked,
}) {
  const [questions, setQuestions] = React.useState([]);
  const [scndQuestions, setScndQuestions] = React.useState([]);
  const [multiple, setMultiple] = React.useState();
  const [data] = React.useContext(FormDataContext);
  const [dataOptions, setDataOptions] = React.useState(standardOptions);

  const setQuestionsFromTypes = () => {
    const { options } = chart;
    if (options.dataType === '3' || options.dataType === '4') {
      const qs = data.questions.filter((q) => q.type === 'control_rating'
      || q.type === 'control_number');

      setQuestions(qs);

      const qs2 = data.questions.filter((q) => q.type === 'control_datetime');
      setScndQuestions(qs2);
    } else if (options.dataType === '2') {
      setQuestions(null);

      const qs = data.questions.filter((q) => q.type === 'control_datetime');
      setScndQuestions(qs);
    } else {
      const qs = data.questions.filter((q) => stdTypeCondition(q.type));
      setQuestions(qs);

      const qs2 = data.questions.filter((q) => q.type === 'control_number');
      setScndQuestions(qs2);
    }
  };

  React.useEffect(() => {
    if (chart) {
      const { options } = chart;
      if (options.qid === -1) {
        setDataOptions([{
          qid: '2',
          text: 'Submission Count / Date',
        }]);
      } else {
        setDataOptions(standardOptions);
      }

      setQuestionsFromTypes();
    } else {
      const qs = data.questions.filter((q) => stdTypeCondition(q.type));

      setQuestions(qs);
    }

    if (chart.options.second && chart.options.second.isChecked !== multiple) {
      setMultiple(chart.options.second.isChecked);
    } else {
      setMultiple(false);
    }
  }, [chart]);

  React.useEffect(() => {
    if (chart && chart.options.dataType != 2) {
      if (questions.length !== 0) {
        if (questions.find((q) => q.qid == chart.options.qid)) {
          return;
        }
        setSelected(questions[0].qid);
      }
    }
  }, [questions]);

  const onQuestionSelect = (qid) => {
    setSelected(qid);
  };

  const onSecondQSelect = (qid) => {
    setChecked(multiple, qid);
  };

  const onChartTypeSelect = (type) => {
    setChartType(type);
  };

  const onDataTypeSelect = (type) => {
    setDataType(type);

    setQuestionsFromTypes();
  };

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

    return 'Submission Count / Question';
  };

  const def3 = () => {
    if (chart && chart.options) {
      const ret = questions.find((q) => q.qid === chart.options.qid);
      if (ret) {
        return ret.text;
      }

      return questions[0].text;
    }
    return questions.map((q) => q.text)[0];
  };

  const def4 = () => {
    if (chart && chart.options && chart.options.second) {
      const ret = scndQuestions.find((q) => q.qid === chart.options.second.qid);
      if (ret) {
        return ret;
      }

      return scndQuestions[0];
    }
    return scndQuestions[0];
  };

  const def5 = () => {
    if (chart && chart.options) {
      return chart.options.colors;
    }

    return ['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'];
  };

  const handleInputChange = (e) => {
    setMultiple(e.target.checked);
    setChecked(e.target.checked, def4().qid);
  };

  return (
    <div style={{ width: '100%' }}>
      <p>Chart Options</p>
      <Dropdown def={def()} options={typeOptions} onSelect={onChartTypeSelect} />
      <Dropdown def={def2()} options={dataOptions} onSelect={onDataTypeSelect} />
      {questions && questions.length !== 0 ? <Dropdown def={def3()} options={questions} onSelect={onQuestionSelect} /> : null}
      <Checkbox state={multiple} handleChange={handleInputChange} />
      {multiple ? <Dropdown def={def4().text} options={scndQuestions} onSelect={onSecondQSelect} /> : null}
      <ColorPicker isMultiple={chart && chart.options.type === 'pie'} colors={def5()} onColorsChange={setColors} />
    </div>
  );
}

function Checkbox({ state, handleChange }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={state}
        onChange={handleChange}
      />
      Get value from another field
    </div>
  );
}
