import React, { useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Layout() {
  const [layout, setLayout] = useState({});

  const onLayoutChange = (curL, newL) => {
    setLayout(newL);
  };

  return (
    <div>
      <ResponsiveReactGridLayout
        className="layout"
        cols={{
          lg: 12, md: 10, sm: 6, xs: 4, xxs: 2,
        }}
        rowHeight={30}
        layouts={layout}
        onLayoutChange={(curL, newL) => onLayoutChange(curL, newL)}
      >
        <div
          key="1"
        >
          <span className="text">1</span>
        </div>
        <div
          key="2"
        >
          <span className="text">2</span>
        </div>
        <div
          key="3"
        >
          <span className="text">3</span>
        </div>
        <div
          key="4"
        >
          <span className="text">4</span>
        </div>
        <div
          key="5"
        >
          <span className="text">5</span>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
}
