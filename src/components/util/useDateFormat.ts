// type DatePropsType = { date: number };
// type DaysPropsType = { date1: number; date2: number };

export const useDateFormat = (date: Date): string => {
  const calcDaysPassed = (date1: Date, date2: Date): number => {
    return Math.round(
      Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  const daysPassed: number = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;
  if (daysPassed >= 7) return `${Math.floor(daysPassed / 7)} weeks ago`;
  else {
    const day: string = `${date.getDate()}`.padStart(2, '0');
    const month: string = `${date.getMonth() + 1}`.padStart(2, '0');
    const year: number = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

// const useDateFormat = (date: Date) => {
//   const calcDaysPassed = (date1: Date, date2: Date) => {
//     Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
//   };

//   const daysPassed = calcDaysPassed(new Date(), date);

//   if (daysPassed === 0) return 'Today';
//   if (daysPassed === 1) return 'Yesterday';
//   if (daysPassed < 7) return `${daysPassed} days ago`;
//   if (daysPassed >= 7) return `${daysPassed / 7} weeks ago`;
//   else {
//     const day = `${date.getDate()}`.padStart(2, 0);
//     const month = `${date.getMonth() + 1}`.padStart(2, 0);
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }
// };
