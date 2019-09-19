import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ChartController from '../Charts';
import { FormDataContext } from '../../Contexts/FormsContext';
import * as Styles from './styles';
import { SubmissionsContext } from '../../Contexts/SubmissionsContext';
import Loading from '../Loading';

const ReactGridLayout = WidthProvider(RGL);

export default function Layout({
  layout, onLayoutChange, charts, setPanel, chartSelection, deleteChart,
}) {
  const [data] = React.useContext(FormDataContext);
  const [selected, setSelected] = chartSelection;
  const [submissions] = React.useContext(SubmissionsContext);

  const selectChart = (key) => {
    setSelected(key);
  };

  const delChart = () => {
    deleteChart(selected);
    setSelected(null);
    setPanel(false);
  };

  React.useEffect(() => console.log(charts), [charts]);

  React.useEffect(() => {
    setSelected(null);
  }, [data]);

  if (!submissions || submissions.length === 0) {
    return (<Loading />);
  }

  return (
    <Styles.DocArea>
      <Styles.LayoutDiv>
        <ReactGridLayout
          className="layout"

          rowHeight={60}
          width={800}
          height={870}
          layout={layout}
          onLayoutChange={(lo) => onLayoutChange(lo)}
          useCSSTransforms={false}
        >
          {charts.map((c) => (
            <div key={c.i}>
              <ChartController index={c.i} onClick={selectChart} setPanel={setPanel} opts={c.options} deleteChart={delChart}>
                {selected === c.i ? <div /> : null }
              </ChartController>
            </div>
          ))}
        </ReactGridLayout>
      </Styles.LayoutDiv>
    </Styles.DocArea>
  );
}
