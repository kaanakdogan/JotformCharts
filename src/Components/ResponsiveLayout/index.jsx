import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ChartController from '../Charts';
import { FormDataContext } from '../../Contexts/FormsContext';


const ReactGridLayout = WidthProvider(RGL);

export default function Layout({
  layout, onLayoutChange, charts, setPanel, chartSelection,
}) {
  const [data] = React.useContext(FormDataContext);
  const [selected, setSelected] = chartSelection;

  const selectChart = (key) => {
    setSelected(key);
  };

  React.useEffect(() => console.log(charts), [charts]);

  React.useEffect(() => {
    setSelected(null);
  }, [data]);

  return (
    <div style={{ position: 'relative', overflow: 'auto' }}>

      <div style={{ width: '1200px', margin: '0 auto' }}>
        <ReactGridLayout
          className="layout"

          rowHeight={60}
          layout={layout}
          onLayoutChange={(lo) => onLayoutChange(lo)}
        >
          {charts.map((c) => (
            <div key={c.i}>
              <ChartController index={c.i} onClick={selectChart} setPanel={setPanel} opts={c.options}>
                {selected === c.i ? <div /> : null }
              </ChartController>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
}
