import React from 'react';
import Layout from '../ResponsiveLayout';
import * as Styles from './styles';
import RightPanel from './RightPanel';
import { FormDataContext } from '../../Contexts/FormsContext';

export default function ReportEditor({ report, onReportEdit }) {
  const [data] = React.useContext(FormDataContext);
  const [layouts, setLayouts] = React.useState(report.charts.map((l) => l.layout));
  const [charts, setCharts] = React.useState(report.charts.map((l) => ({ i: l.key })));
  const [panel, setPanel] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    const qs = data.questions.filter((q) => q.type === 'control_datetime'
        || q.type === 'control_time' || q.type === 'control_dropdown'
        || q.type === 'control_radio' || q.type === 'control_checkbox');

    setQuestions(qs);
  }, []);

  React.useEffect(() => {
    setLayouts(report.charts.map((l) => l.layout));
    setCharts(report.charts.map((l) => ({ i: l.key })));
  }, [report]);

  React.useEffect(() => {
    const reportToReturn = JSON.parse(JSON.stringify(report));
    reportToReturn.charts = [];
    for (let c = 0; c < layouts.length; c++) {
      const k = layouts[c].i;
      reportToReturn.charts.push({
        layout: layouts.filter((l) => l.i == k)[0],
        key: k,
      });
    }

    onReportEdit(reportToReturn);
  }, [layouts]);

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
  return (
    <div>
      <button type="button" onClick={handleAdd}>New Chart</button>
      <Styles.FlexContainer>
        <Styles.MainItem>
          <div style={{ width: '100%' }}>
            <Layout charts={charts} layout={layouts} onLayoutChange={onLayoutsChange} setPanel={togglePanel} />
          </div>
        </Styles.MainItem>
        <Styles.RightItem isVisible={panel}>
          <RightPanel questions={questions} />
        </Styles.RightItem>
      </Styles.FlexContainer>
    </div>
  );
}
