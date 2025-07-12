export const getWeekday = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDay();
};

export const isAtLeastOneWeekApart = (dateStr1: string, dateStr2: string) => {
  const [y1, m1, d1] = dateStr1.split('-').map(Number);
  const [y2, m2, d2] = dateStr2.split('-').map(Number);
  const dt1 = new Date(y1, m1 - 1, d1);
  const dt2 = new Date(y2, m2 - 1, d2);
  const diffMs = Math.abs(dt2.getTime() - dt1.getTime());
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  return diffMs >= oneWeekMs;
};
