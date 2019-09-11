import React from 'react';
import Layout from '../ResponsiveLayout';
import * as Styles from './styles';
import RightPanel from './RightPanel';

export default function ReportEditor({ report, onReportEdit }) {
  const [layouts, setLayouts] = React.useState(report.charts.map((l) => l.layout));
  const [charts, setCharts] = React.useState(report.charts);
  const [panel, setPanel] = React.useState(false);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    setLayouts(report.charts.map((l) => l.layout));
    setCharts(report.charts);
  }, [report]);

  // Save layout and charts on editing either of those.
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

    setCharts((old) => [...old, {
      i: key,
      options: {
        qid: '3',
        type: 'bar',
      },
    }]);

    setLayouts((old) => [...old, {
      i: String(key),
      x: 0,
      y: 0,
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

  return (
    <div>
      <button type="button" onClick={handleAdd}>New Chart</button>
      <Styles.FlexContainer>
        <Styles.MainItem>
          <div style={{ width: '100%' }}>
            <Layout
              charts={charts}
              layout={layouts}
              onLayoutChange={onLayoutsChange}
              setPanel={togglePanel}
              chartSelection={[selected, setSelected]}
            />
          </div>
        </Styles.MainItem>
        <Styles.RightItem isVisible={panel}>
          {(
            <RightPanel
              chart={charts.find((c) => c.i == selected)}
              setSelected={setSelectedQuestion}
              setChartType={setChartType}
              setDataType={setDataType}
            />
          )}
        </Styles.RightItem>
      </Styles.FlexContainer>
    </div>
  );
}
