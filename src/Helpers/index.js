import currencyFormatter from "currency-formatter";

export const temp = "";

export const getPrice = (value = 0, unit = "VND", text = "Price:") => {
  let temp = "";
  switch (unit) {
    case "VND":
      temp = currencyFormatter.format(value, { code: "VND" });
      break;
    default:
      break;
  }
  return `${text} ${temp}`;
};

export const toDataURL = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};

export const getOrderTotal = (data = []) => {
  // console.log({ data });
  let total = 0;
  _.forEach(data, (x) => {
    total += x.price * x.quantity;
  });
  return getPrice(total, undefined, "");
};
