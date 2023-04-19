import moment from "moment";

export const getDateWithTime = (date) => {
  return moment(date).format("DD-MM-YYYY hh:mm A");
};

export const getDate = (date) => {
  if (date) {
    return moment.utc(date).local().format("DD/MM/YYYY");
  } else {
    return "";
  }
};

export const getDateInMonthAndYear = (date) => moment(date).format("YYYY-MM");

export const getMonthAndYear = (date) => {
  const _date = moment(date);
  return { month: _date.month() + 1, year: _date.year() };
};

export const checkIsEqualDates = (date1, date2) => {
  return moment(date1).isSame(date2);
};

export const convertToDateInsatnce = (date) => {
  if (date) {
    return moment(date).toDate();
  }
  return "";
};

export const returnDateRangeString = (fromDate, toDate) => {
  if (fromDate && toDate) {
    return `${getDate(fromDate)}-${getDate(toDate)}`;
  }
};

export const getNextDate = (date, noOfDaysToAdd = 1) => {
  return moment(date).add(noOfDaysToAdd, "days").format();
};

export const getPreviousDate = (date, noOfDaysToSubtract = 1) => {
  return moment(date).subtract(noOfDaysToSubtract, "days").format();
};

export const convertDateToYearMonthDayFormat = (date) => {
  if (date) {
    return moment(date).format("YYYY-MM-DD");
  }
  return "";
};

export const getNoOfDaysBetweenTwoDays = (date1, date2) => {
  return moment(date1).diff(moment(date2), "days");
};

export const returnDateString = (date, dateFormat = "YYYY-MM-DD") => {
  return moment(date, dateFormat).format("Do MMMM YYYY");
};

export const getDateOnly = (date) => {
  return moment(date).format("DD");
};

export const getMonth = (date) => {
  return moment(date).format("MM");
};

export const getYear = (date) => {
  return moment(date).format("YYYY");
};

export const isEQualDates = (date1, date2) => {
  return moment(date1).isSame(moment(date2));
};

export const getPreviousYear = () => {
  const date = new Date();
  const previousYear = date.setFullYear(date.getFullYear() - 1);
  return previousYear;
};

export const getTime = (date) => {
  return moment(date).format("HH:mm");
};

export const setMonthAndYear = ({ month, year }) => {
  const date = new Date();
  return date.setFullYear(year, month - 1);
};

export const convertTimeTo12hoursFormat = (time) => {
  return moment(time, "HH:mm").format("hh:mm A");
};
