import React from 'react';
import Layout from '../ResponsiveLayout';
import * as Styles from './styles';
import RightPanel from './RightPanel';
import { FormDataContext } from '../../Contexts/FormsContext';

function getDefaultQuestion(questions) {
  return questions.filter((q) => q.type === 'control_datetime'
      || q.type === 'control_time' || q.type === 'control_dropdown'
      || q.type === 'control_radio' || q.type === 'control_checkbox'
      || q.type === 'control_rating' || q.type === 'control_number')[0];
}

export default function ReportEditor({ report, onReportEdit }) {
  const [layouts, setLayouts] = React.useState();
  const [charts, setCharts] = React.useState();
  const [questions] = React.useContext(FormDataContext);
  const [panel, setPanel] = React.useState(false);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    console.log(report);
    if (report && report.charts) {
      setLayouts(report.charts.map((l) => l.layout));
      setCharts(report.charts);
    }
  }, [report]);

  // Save layout and charts on editing either of those.
  React.useEffect(() => {
    if (layouts && charts) {
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
    }
  }, [layouts, charts]);

  const onLayoutsChange = (layout) => {
    setLayouts(layout);
  };

  const add = () => {
    const key = charts.reduce((a, b) => Math.max(a, b.i), 1) + 1;

    setCharts((old) => [...old, {
      i: key,
      options: {
        qid: getDefaultQuestion(questions.questions).qid,
        type: 'bar',
        colors: ['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF'],
      },
    }]);

    setLayouts((old) => [...old, {
      i: String(key),
      x: 0,
      y: Infinity,
      w: 4,
      h: 4,
      minW: 4,
      minH: 4,
    }]);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    add();
  };

  const togglePanel = () => {
    setPanel(!panel);
  };

  const deleteChart = (key) => {
    const newCharts = charts.filter((c) => c.i !== key);
    const newLayouts = layouts.filter((l) => Number(l.i) !== key);
    console.log(key);
    console.log({ newCharts, charts });
    console.log({ newLayouts, layouts });

    setCharts(newCharts);
    setLayouts(newLayouts);
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

  const setDataType = (type) => {
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.dataType = type;

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

  const setColors = (cols) => {
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.colors = cols;

        return newC;
      }

      return c;
    });

    setCharts(newCharts);
  };

  return (
    <>
      <button type="button" onClick={handleAdd}>New Chart</button>
      {charts ? (
        <Styles.FlexContainer>
          <Styles.MainItem>
            <Styles.DocMain>
              <Layout
                charts={charts}
                layout={layouts}
                onLayoutChange={onLayoutsChange}
                setPanel={togglePanel}
                deleteChart={deleteChart}
                chartSelection={[selected, setSelected]}
              />
            </Styles.DocMain>
          </Styles.MainItem>

          {panel ? (
            <Styles.RightItem isVisible={panel}>
              <RightPanel
                chart={charts.find((c) => {
                  console.log(c.i);
                  console.log(selected);
                  return c.i == selected;
                })}
                setSelected={setSelectedQuestion}
                setChartType={setChartType}
                setDataType={setDataType}
                setColors={setColors}
              />
            </Styles.RightItem>
          ) : null}

        </Styles.FlexContainer>
      ) : null}
    </>
  );
}
