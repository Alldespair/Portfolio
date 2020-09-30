const daysInWeek = 7;

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  Desember: 11
};

export function areEqual(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isLeapYear(year) {
  return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  if (isLeapYear(year) && month === Month.February) {
    return daysInMonth[month] + 1;
  } else {
    return daysInMonth[month];
  }

  return daysInMonth[month];
}

export function getMonthDate(year, month) {
  const result = [];
  const date= new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = date.getDay();
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / daysInWeek; i++) {

    result[i] = [];

    for (let j = 0; j < daysInWeek; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      };
    }
  }

  return result;
}