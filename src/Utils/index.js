import { notification } from "antd";
import moment from "moment";

export const getFullName = (x = {}) =>
  `${x.firstName || ""} ${x.lastName || ""}`;

export const isValidEmail = (email = "") => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
};

export const toggleArr = (item = "", arr = []) => {
  const array = [...arr]; // make a separate copy of the array
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
    return array;
  }
  array.push(item);
  return array;
};

export const normalizeString = (str = "") => {
  if (str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return "";
};

let handleShowMes;

export const showFailedMsg = (
  message = "",
  description = undefined,
  className = ""
) => {
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.error({
      message,
      description,
      placement: "bottomLeft",
      duration: 3,
      className,
    });
  }, 300);
};

export const showSuccessMsg = (
  message = "",
  description = undefined,
  className = ""
) => {
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.success({
      message,
      description,
      placement: "bottomLeft",
      duration: 3,
      className,
    });
  }, 300);
};

export const showWarningMsg = (
  message = "",
  description = undefined,
  className = ""
) => {
  if (handleShowMes) {
    clearTimeout(handleShowMes);
  }
  handleShowMes = setTimeout(() => {
    notification.warning({
      message,
      description,
      placement: "bottomLeft",
      duration: 3,
      className,
    });
  }, 300);
};

export const mutateDate = (date = undefined) => {
  if (!date) {
    return undefined;
  }
  return moment(date).isValid() ? moment(date).format("YYYY-MM-DD") : undefined;
};

export const mutateDateTime = (dateTime = undefined) => {
  if (!dateTime) {
    return undefined;
  }
  return moment(dateTime).isValid()
    ? moment(dateTime).toISOString()
    : undefined;
};

export const isNil = (x) => {
  return x === null || x === undefined;
};

export const sumBy = (arr = [], func) =>
  arr.reduce((acc, item) => acc + func(item), 0);

export const isEmpty = (data) => {
  return (
    data === null ||
    data === undefined ||
    JSON.stringify(data) === "{}" ||
    JSON.stringify(data) === "[]"
  );
};

export const range = (start, end, increment) => {
  const isEndDef = typeof end !== "undefined";
  end = isEndDef ? end : start;
  start = isEndDef ? start : 0;

  if (typeof increment === "undefined") {
    increment = Math.sign(end - start);
  }

  const length = Math.abs((end - start) / (increment || 1));

  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + increment,
    }),
    { current: start, result: [] }
  );

  return result;
};

const ordered = (unordered) =>
  Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});

export const isEqual = (data1, data2) => {
  return (
    JSON.stringify(ordered({ ...data1 })) ===
    JSON.stringify(ordered({ ...data2 }))
  );
};

export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const sortBy = (arr = [], func = () => { }) => {
  return arr.sort(func);
}
