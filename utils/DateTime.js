/**
 * @params {ISOString} date
 * @return {number} Milliseconds
 */
export const getDifferenceTimeInSeconds = (prevDate, nextDate) => {
  if (!prevDate || !nextDate) return 0;
  const prevTime = new Date(prevDate);
  const nextTime = new Date(nextDate);

  return (nextTime.getTime() - prevTime.getTime()) / 1000;
};

export const addZero = number => {
  const n = parseInt(number).toString();
  return n.length === 1 ? `0${n}` : n;
};

export const addZeroFloat = number => {
  const n = parseInt(number).toString();
  const m = number.toFixed(1);

  return n.length === 1 ? `0${m}` : m;
};

export const formatTime = (timestamp, onlySeconds = false) => {
  const time = timestamp / 1000;

  if (onlySeconds) {
    return time.toFixed(2);
  }

  const hour = parseInt(time / 3600, 10);
  const minute = parseInt((time / 3600 - hour) * 60, 10);
  const second = (time - (hour * 60 + minute) * 60).toFixed(2);

  if (hour <= 0) return `${addZero(minute)}:${addZero(second)}`;
  return `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
};
