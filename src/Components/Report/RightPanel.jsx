import React from 'react';
import * as Styles from './styles';
import { FormDataContext } from '../../Contexts/FormsContext';
import Dropdown from '../Dropdown';
import ColorPicker from '../ColorPicker';

export default function RightPanel({
  chart, setSelected, setChartType, setDataType, setColors, setChecked,
}) {
  const [questions, setQuestions] = React.useState([]);
  const [scndQuestions, setScndQuestions] = React.useState([]);
  const [multiple, setMultiple] = React.useState(false);
  const [data] = React.useContext(FormDataContext);
  const [dataOptions, setDataOptions] = React.useState([{
    qid: '1',
    text: 'Submission Count / Question',
  }, {
    qid: '2',
    text: 'Submission Count / Date',
  }, {
    qid: '3',
    text: 'Average of Answers / Date',
  }, {
    qid: '4',
    text: 'Highest of Answers / Date',
  }]);

  React.useEffect(() => {
    if (chart) {
      if (chart.options.qid === -1) {
        setDataOptions([{
          qid: '2',
          text: 'Submission Count / Date',
        }]);
      } else {
        setDataOptions([{
          qid: '1',
          text: 'Submission Count / Question',
        }, {
          qid: '2',
          text: 'Submission Count / Date',
        }, {
          qid: '3',
          text: 'Average of Answers / Date',
        }, {
          qid: '4',
          text: 'Highest of Answers / Date',
        }]);
      }

      if (chart.options.dataType == 3 || chart.options.dataType == 4) {
        const qs = data.questions.filter((q) => q.type === 'control_rating'
        || q.type === 'control_number');

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

    const qs = data.questions.filter((q) => q.type === 'control_datetime');
    setScndQuestions(qs);
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

    if (type == 3 || type == 4) {
      const qs = data.questions.filter((q) => q.type === 'control_rating'
      || q.type === 'control_number');

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

  const handleChange = (bool) => {
    setMultiple(bool);
    setChecked(bool, def4().qid);
  };

  return (
    <div style={{ width: '100%' }}>
      <p>Chart Options</p>
      <Dropdown def={def()} options={typeOptions} onSelect={onChartTypeSelect} />
      <Dropdown def={def2()} options={dataOptions} onSelect={onDataTypeSelect} />
      {questions && questions.length !== 0 ? <Dropdown def={def3()} options={questions} onSelect={onQuestionSelect} /> : null}
      <Checkbox handleChange={handleChange} />
      {multiple ? <Dropdown def={def4().text} options={scndQuestions} onSelect={onSecondQSelect} /> : null}
      <ColorPicker isMultiple={chart && chart.options.type === 'pie'} colors={def5()} onColorsChange={setColors} />
    </div>
  );
}

function Checkbox({ handleChange }) {
  const [state, setState] = React.useState(false);

  const handleInputChange = (e) => {
    setState(e.target.checked);
    handleChange(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={state}
        onChange={handleInputChange}
      />
      Checkbox
    </div>
  );
}
