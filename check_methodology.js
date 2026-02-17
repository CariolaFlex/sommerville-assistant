const data = require('./src/data/recommendations.json');

Object.keys(data.recommendations).forEach(id => {
  const rec = data.recommendations[id];
  if (rec.methodology) {
    const hasOld = rec.methodology.chapter !== undefined && rec.methodology.practices !== undefined;
    const hasNew = rec.methodology.description !== undefined && rec.methodology.origin !== undefined;
    console.log(id + ': ' + (hasOld ? 'OLD' : hasNew ? 'NEW' : 'UNKNOWN'));
  } else {
    console.log(id + ': NO METHODOLOGY');
  }
});
