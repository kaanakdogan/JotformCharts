import React from 'react';
import Layout from '../ResponsiveLayout';
import * as Styles from './styles';
import RightPanel from './RightPanel';
import { FormDataContext } from '../../Contexts/FormsContext';

export default function ReportEditor({ report, onReportEdit }) {
  const [data] = React.useContext(FormDataContext);
  const [layouts, setLayouts] = React.useState(report.charts.map((l) => l.layout));
  const [charts, setCharts] = React.useState(report.charts);
  const [panel, setPanel] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [selected, setSelected] = React.useState();


  React.useEffect(() => {
    const qs = data.questions.filter((q) => q.type === 'control_datetime'
        || q.type === 'control_time' || q.type === 'control_dropdown'
        || q.type === 'control_radio' || q.type === 'control_checkbox');

    setQuestions(qs);
  }, []);

  React.useEffect(() => {
    setLayouts(report.charts.map((l) => l.layout));
    setCharts(report.charts);
  }, [report]);

  React.useEffect(() => {
    const reportToReturn = JSON.parse(JSON.stringify(report));
    reportToReturn.charts = [];
    for (let c = 0; c < layouts.length; c++) {
      const k = layouts[c].i;
      reportToReturn.charts.push({
        layout: layouts.filter((l) => l.i == k)[0],
        i: k,
        options: charts[c].options,
      });
    }
    onReportEdit(reportToReturn);
  }, [layouts, charts]);

  const onLayoutsChange = (layout) => {
    setLayouts(layout);
  };

  const add = () => {
    const key = charts.reduce((a, b) => Math.max(a, b.i), 1) + 1;

    const lo = {
      i: String(key),
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      minW: 4,
      minH: 4,
    };

    setCharts((old) => [...old, {
      i: key,
      options: {
        qid: '3',
        type: 'bar',
      },
    }]);

    setLayouts((old) => [...old, lo]);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    add();
  };

  const togglePanel = () => {
    setPanel(!panel);
  };

  const setSelectedQuestion = (qid) => {
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.qid = qid;

        return newC;
      }

      return c;
    });

    setCharts(newCharts);
  };

  const setChartType = (type) => {
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.type = type;

        return newC;
      }

      return c;
    });

    setCharts(newCharts);
  };

  return (
    <div>
      <button type="button" onClick={handleAdd}>New Chart</button>
      <Styles.FlexContainer>
        <Styles.MainItem>
          <div style={{ width: '100%' }}>
            <Layout charts={charts} layout={layouts} onLayoutChange={onLayoutsChange} setPanel={togglePanel} chartSelection={[selected, setSelected]} />
          </div>
        </Styles.MainItem>
        <Styles.RightItem isVisible={panel}>
          {questions && questions.length !== 0 ? (
            <RightPanel
              chart={charts.find((c) => c.i == selected)}
              questions={questions}
              setSelected={setSelectedQuestion}
              setChartType={setChartType}
            />
          ) : null}
        </Styles.RightItem>
      </Styles.FlexContainer>
    </div>
  );
}
