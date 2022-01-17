import moment from "moment";
import fetchHistory from "../../Apollo/Functions/Fetch/fetchHistory";
import auth from "../../Helpers/auth";

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
      food_id: y.food_id,
      email: y.email,
    }));
    orderHistory.push({
      date: x,
      data,
    });
  });
  // console.log({ grouped, orderHistory });

  return _.orderBy(orderHistory, [(x) => moment(x.date).valueOf()], ["desc"]);
};
