// Returns: an array of arrays
export default times => {
  if (times.length === 0) {
    return [];
  }

  const bundle = [];
  let tmp = [];
  let currNum = '';

  times.map((time, idx) => {
    const hour = time.split(':')[0];
    if (currNum === '') {
      currNum = hour;
    } else if (currNum !== hour) {
      bundle.push(tmp);
      tmp = [];
      currNum = hour;
    }
    tmp.push(idx);
  });
  bundle.push(tmp);

  return bundle;
};
