
export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});

  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const groupByHour = (readings) => {
  const groupedByHour = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const hour = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate(),
      readingDate.getHours()
    ).getTime();
    if (!curr[hour]) curr[hour] = 0;
    curr[hour] += value;
    return curr;
  }, {});

  return Object.entries(groupedByHour).map(([hour, value]) => ({
    time: Number(hour),
    value,
  }));
};

export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};
