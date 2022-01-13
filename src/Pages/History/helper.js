import moment from "moment";
import fetchHistory from "../../Apollo/Functions/Fetch/fetchHistory";

export const a = "";

export const queryHistory = async () => {
  const res = await fetchHistory();
  const orderHistory = [];
  const grouped = _.groupBy(res, (car) => car.createdAt);

  Object.keys(grouped).forEach((x) => {
    const data = _.map(grouped[x], (y, index) => ({
      index: index + 1,
      name: y.name,
      price: y.price,
      quantity: y.quantity,
    }));
    orderHistory.push({
      date: x,
      data,
    });
  });
  // console.log({ grouped, orderHistory });

  return orderHistory;
};
