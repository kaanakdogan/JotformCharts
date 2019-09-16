import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ChartController from '../Charts';
import { FormDataContext } from '../../Contexts/FormsContext';
import * as Styles from './styles';


const ReactGridLayout = WidthProvider(RGL);

export default function Layout({
  layout, onLayoutChange, charts, setPanel, chartSelection, deleteChart,
}) {
  const [data] = React.useContext(FormDataContext);
  const [selected, setSelected] = chartSelection;

  const selectChart = (key) => {
    setSelected(key);
  };

  const delChart = () => {
    deleteChart(selected);
    setSelected(null);
    setPanel();
  };

  React.useEffect(() => console.log(charts), [charts]);

  React.useEffect(() => {
    setSelected(null);
  }, [data]);

  return (
    <Styles.DocArea>

      <Styles.LayoutDiv style={{ width: '1200px', margin: '0 auto' }}>
        <ReactGridLayout
          className="layout"

          rowHeight={60}
          width={1200}
          height={870}
          layout={layout}
          onLayoutChange={(lo) => onLayoutChange(lo)}
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
