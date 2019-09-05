
// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const data = [];
  for (let i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  const data = [];
  const baseTime = new Date('2018-05-01T00:00:00').getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  for (let i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

export default function getFeeds() {
  const feeds = [];

  feeds.push({
    title: 'Visits',
    data: getRandomDateArray(150),
  });

  feeds.push({
    title: 'Categories',
    data: getRandomArray(20),
  });

  feeds.push({
    title: 'Categories',
    data: getRandomArray(10),
  });

  feeds.push({
    title: 'Data 4',
    data: getRandomArray(6),
  });

  return feeds;
}
