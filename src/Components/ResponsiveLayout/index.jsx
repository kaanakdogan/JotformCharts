import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import DashBoard from '../Charts';


const ReactGridLayout = WidthProvider(RGL);

export default function Layout({ layout, onLayoutChange, charts }) {
  return (
    <div style={{ width: '1200px', margin: '0 auto' }}>
      <ReactGridLayout
        className="layout"

        rowHeight={60}
        layout={layout}
        onLayoutChange={(lo) => onLayoutChange(lo)}
      >
        {charts.map((c) => (
          <div key={c.i}>
            <DashBoard />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
