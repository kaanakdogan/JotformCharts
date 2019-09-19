/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
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
}, {
  qid: '5',
  text: 'Sum / Date',
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

const dateTypeOptions = [
  { qid: 'day', text: 'Day' },
  { qid: 'week', text: 'Week' },
];

const getDateFromJson = (date) => {
  if (date) {
    return new Date(date.year, date.month, date.day);
  }

  return null;
};

export default function RightPanel({
  chart, setSelected, setChartType, setDataType, setColors, setChecked, setDateType, setDateFilters,
}) {
  const [questions, setQuestions] = React.useState([]);
  const [scndQuestions, setScndQuestions] = React.useState([]);
  const [multiple, setMultiple] = React.useState();
  const [data] = React.useContext(FormDataContext);
  const [dataOptions, setDataOptions] = React.useState(standardOptions);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const setQuestionsFromTypes = () => {
    const { options } = chart;
    if (options.dataType === '3' || options.dataType === '4' || options.dataType === '5') {
      const qs = data.questions.filter((q) => q.type === 'control_rating'
      || q.type === 'control_number');

      setQuestions(qs);

      const qs2 = data.questions.filter((q) => q.type === 'control_datetime');
      setScndQuestions(qs2);
    } else if (options.dataType === '2') {
      setQuestions(null);
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

    setStartDate(getDateFromJson(chart.options.startDate));
    setEndDate(getDateFromJson(chart.options.endDate));
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

  const dateTypeDef = () => {
    if (chart && chart.options && chart.options.dateType) {
      return dateTypeOptions.find((q) => q.qid === chart.options.dateType).text;
    }

    return 'Day';
  };

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
    setChecked(multiple, def4().qid);
  };

  const onDateTypeSelect = (type) => {
    setDateType(type);
  };

  const onDateStartSelect = (date) => {
    setStartDate(date);

    let end = null;
    if (endDate) {
      const year = endDate.getFullYear();
      const month = endDate.getMonth();
      const day = endDate.getDate();
      end = { year, month, day };
    }

    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const start = { year, month, day };

      console.log({ start, end });
      setDateFilters(start, end);
    } else {
      setDateFilters(null, end);
    }
  };

  const onDateEndSelect = (date) => {
    setEndDate(date);

    let start = null;
    if (startDate) {
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
      const day = startDate.getDate();
      start = { year, month, day };
    }


    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const end = { year, month, day };
      console.log({ start, end });
      setDateFilters(start, end);
    } else {
      setDateFilters(start, null);
    }
  };

  const handleInputChange = (e) => {
    setMultiple(e.target.checked);
    setChecked(e.target.checked, def4().qid);
  };

  const isDate = () => {
    if (chart && (chart.options.dataType === '2'
      || chart.options.dataType === '3' || chart.options.dataType === '4'
      || chart.options.dataType === '5')) {
      return true;
    }

    if (chart && chart.options.dataType === '1'
     && data.questions.find((q) => q.qid === chart.options.qid).type === 'control_datetime') {
      return true;
    }
    return false;
  };


  return (
    <Styles.RightPanelWrapper>
      <Styles.RightPanelItem>

        <p>Chart Options</p>
      </Styles.RightPanelItem>
      <Styles.RightPanelItem>
        <Dropdown def={def()} options={typeOptions} onSelect={onChartTypeSelect} />
      </Styles.RightPanelItem>
      <Styles.RightPanelItem>
        <Dropdown def={def2()} options={dataOptions} onSelect={onDataTypeSelect} />
      </Styles.RightPanelItem>
      {questions && questions.length !== 0
        ? (
          <Styles.RightPanelItem>
            <Dropdown def={def3()} options={questions} onSelect={onQuestionSelect} />
          </Styles.RightPanelItem>
        )
        : null}
      {scndQuestions && scndQuestions.length !== 0
        ? (
          <Styles.RightPanelItem>
            <Checkbox state={multiple} handleChange={handleInputChange} />
          </Styles.RightPanelItem>
        )
        : null}
      {multiple
        ? (
          <Styles.RightPanelItem>
            <Dropdown def={def4().text} options={scndQuestions} onSelect={onSecondQSelect} />
          </Styles.RightPanelItem>
        )
        : null}
      {isDate() ? (
        <>
          <Styles.RightPanelItem>
            <Dropdown def={dateTypeDef()} options={dateTypeOptions} onSelect={onDateTypeSelect} />
          </Styles.RightPanelItem>
          <Styles.RightPanelItem>
            <DatePicker
              selected={startDate}
              onChange={onDateStartSelect}
            />
          </Styles.RightPanelItem>
          <Styles.RightPanelItem>
            <DatePicker
              selected={endDate}
              onChange={onDateEndSelect}
            />
          </Styles.RightPanelItem>
        </>
      )
        : null}

      <ColorPicker isMultiple={chart && chart.options.type === 'pie'} colors={def5()} onColorsChange={setColors} />
    </Styles.RightPanelWrapper>
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
