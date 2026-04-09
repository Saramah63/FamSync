export const formatShortDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(isoDate));

export const formatWeekday = (isoDate: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
  }).format(new Date(isoDate));

export const formatTimeRange = (startTime: string, endTime: string) =>
  `${startTime} - ${endTime}`;

export const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

export const isoDateWithOffset = (offsetDays: number) => {
  const date = startOfToday();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
};

export const sameDay = (left: string, right: string) =>
  new Date(left).toDateString() === new Date(right).toDateString();

export const eventDateTime = (isoDate: string, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(isoDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const isUpcoming = (isoDate: string, startTime: string) =>
  eventDateTime(isoDate, startTime).getTime() >= Date.now();

export const isOverlapping = (
  left: { date: string; startTime: string; endTime: string },
  right: { date: string; startTime: string; endTime: string }
) => {
  if (!sameDay(left.date, right.date)) return false;
  const leftStart = eventDateTime(left.date, left.startTime).getTime();
  const leftEnd = eventDateTime(left.date, left.endTime).getTime();
  const rightStart = eventDateTime(right.date, right.startTime).getTime();
  const rightEnd = eventDateTime(right.date, right.endTime).getTime();

  return leftStart < rightEnd && rightStart < leftEnd;
};
