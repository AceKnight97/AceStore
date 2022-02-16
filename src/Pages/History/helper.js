import moment from "moment";
import fetchHistory from "../../Apollo/Functions/Fetch/fetchHistory";

export const a = "a";

const formatOrderHisData = (y, index) => ({
  index: index + 1,
  name: y?.food?.name || "",
  price: y?.food?.price || "",
  food: y?.food?.id || "",
  quantity: y?.foodOrder?.quantity || "",
  email: y?.user?.email,
});

export const queryHistory = async () => {
  try {
    const res = await fetchHistory();
    // console.log({ res, foodOrder: res.foodOrder });
    const orderHistory = [];
    const grouped = _.groupBy(res, (order) => order?.foodOrder?.createdAt);
    // console.log({ grouped });
    Object.keys(grouped).forEach((x) => {
      const data = _.map(grouped[x], (y, index) =>
        formatOrderHisData(y, index)
      );
      orderHistory.push({
        date: x,
        data,
        notes: grouped[x]?.[0]?.foodOrder?.notes || "",
        status: grouped[x]?.[0]?.foodOrder?.status || "",
      });
    });
    // console.log({ grouped, orderHistory });
    return _.orderBy(orderHistory, [(x) => moment(x.date).valueOf()], ["desc"]);
  } catch (error) {
    throw error;
  }
};
