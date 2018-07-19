const minDate = new Date(2015, 8, 15, 10, 30, 0);
const maxDate = new Date(2049, 1, 1, 23, 49, 59);

const STATISTIC_TODAY = 0;
const STATISTIC_WEEK = 1;

const statisticDate = {
  [STATISTIC_TODAY]: 'today',
  [STATISTIC_WEEK]: 'week'
};

const statisticDateList = [
  {
    key: STATISTIC_TODAY,
    value: 'today'
  }, {
    key: STATISTIC_WEEK,
    value: 'week'
  }
];

const twentyFourHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const sevenWeekDays = [1, 2, 3, 4, 5, 6, 7];

export default {
  minDate,
  maxDate,
  statisticDate,
  statisticDateList,
  twentyFourHours,
  sevenWeekDays
};
