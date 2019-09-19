import React from 'react';
import Layout from '../ResponsiveLayout';
import * as Styles from './styles';
import RightPanel from './RightPanel';
import { FormDataContext } from '../../Contexts/FormsContext';

function getDefaultQuestion(questions) {
  const toRet = questions.find((q) => q.type === 'control_datetime'
      || q.type === 'control_time' || q.type === 'control_dropdown'
      || q.type === 'control_radio' || q.type === 'control_checkbox'
      || q.type === 'control_rating' || q.type === 'control_number');

  if (toRet) {
    return toRet.qid;
  }

  return -1;
}

export default function ReportEditor({ report, onReportEdit }) {
  const [layouts, setLayouts] = React.useState();
  const [charts, setCharts] = React.useState();
  const [questions] = React.useContext(FormDataContext);
  const [panel, setPanel] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [didMount, setDidMount] = React.useState(false);

  const saveReport = () => {
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
  };

  React.useEffect(() => {
    if (report && report.charts) {
      setLayouts(report.charts.map((l) => l.layout));
      setCharts(report.charts);
      setDidMount(true);
    }
  }, [report]);

  // Save layout and charts on editing either of those.
  React.useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    }

    if (layouts && charts) {
      saveReport();
    }
  }, [charts]);

  React.useEffect(() => {
    if (layouts && charts) {
      saveReport();
    }
  }, [layouts]);

  React.useEffect(() => {
    setPanel(false);
  }, [report]);

  const onLayoutsChange = (layout) => {
    setLayouts(layout);
  };

  const add = () => {
    const key = charts.reduce((a, b) => Math.max(a, b.i), 1) + 1;

    setCharts((old) => [...old, {
      i: key,
      options: {
        qid: getDefaultQuestion(questions.questions),
        dataType: getDefaultQuestion(questions.questions) === -1 ? '2' : '1',
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

  const togglePanel = (e) => {
    if (e) {
      setPanel(!panel);
    } else {
      setPanel(false);
    }
  };

  const deleteChart = (key) => {
    const newCharts = charts.filter((c) => c.i !== key);
    const newLayouts = layouts.filter((l) => Number(l.i) !== key);

    setLayouts(newLayouts);
    setCharts(newCharts);
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

  const setDateType = (type) => {
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.dateType = type;

        return newC;
      }

      return c;
    });

    setCharts(newCharts);
  };

  const setChecked = (bool, qid) => {
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.second = {
          isChecked: bool,
          qid,
        };
        return newC;
      }
      return c;
    });
    setCharts(newCharts);

    console.log(newCharts);
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

  const setDateFilters = (start, end) => {
    if (!didMount) {
      return;
    }
    const newCharts = charts.map((c) => {
      if (c.i === selected) {
        const newC = c;
        newC.options.startDate = start;
        newC.options.endDate = end;

        console.log(newC);
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
                chart={charts.find((c) => c.i == selected)}
                setSelected={setSelectedQuestion}
                setChartType={setChartType}
                setDataType={setDataType}
                setColors={setColors}
                setChecked={setChecked}
                setDateType={setDateType}
                setDateFilters={setDateFilters}
              />
            </Styles.RightItem>
          ) : null}

        </Styles.FlexContainer>
      ) : null}
    </>
  );
}
