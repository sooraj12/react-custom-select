function groupBy(array, key) {
  const grouped = array.reduce((acc, cur, i) => {
    acc[cur[key]] = [...(acc[cur[key]] || []), cur];
    return acc;
  }, {});

  return grouped;
}

export { groupBy };
