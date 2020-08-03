/* eslint-disable func-names */
import { MONTHS } from '../constants/constants';

const date = (function () {
  const obj = {};
  const dateRightNow = () => {
    const dateNow = new Date();
    const dateInFormat = `${dateNow.getFullYear()}.${dateNow.getMonth() + 1}.${dateNow.getDate()}`;
    return dateInFormat;
  };
  obj.now = dateRightNow;

  const dateDaysAgo = (days) => {
    const daysAgo = new Date(new Date() - (1000 * 3600 * 24 * days));
    const dateInFormat = `${daysAgo.getFullYear()}.${daysAgo.getMonth() + 1}.${daysAgo.getDate()}`;
    return dateInFormat;
  };
  obj.daysAgo = dateDaysAgo;

  const dateTransform = (dateToTransform) => {
    const time = new Date(Date.parse(dateToTransform));
    const fullDate = `${time.getDate()} ${MONTHS[time.getMonth()]}, ${time.getFullYear()}`;
    return fullDate;
  };
  obj.cardDateTransform = dateTransform;

  return obj;
}());

export { date as default };
