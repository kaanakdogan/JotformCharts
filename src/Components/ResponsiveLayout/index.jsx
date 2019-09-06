import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ChartController from '../Charts';


const ReactGridLayout = WidthProvider(RGL);

export default function Layout({
  layout, onLayoutChange, charts, setPanel,
}) {
  const [selected, setSelected] = React.useState();

  const selectChart = (key) => {
    console.log('Click from Layout');
    setSelected(key);
  };

  React.useEffect(() => {
    setSelected(null);
  }, [charts]);

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
              <ChartController index={c.i} onClick={selectChart} setPanel={setPanel}>
                {selected === c.i ? <div /> : null }
              </ChartController>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  );
}
