import { getPrice } from "../../../Helpers";

export const getOrderTotal = (data = []) => {
  console.log({ data });
  let total = 0;
  _.forEach(data, (x) => {
    total += x.price * x.quantity;
  });
  return getPrice(total, undefined, "");
};

export const a = "";
