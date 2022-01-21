import moment from "moment";
import fetchHistory from "../../Apollo/Functions/Fetch/fetchHistory";
import auth from "../../Helpers/auth";

export const a = "a";

const formatOrderHisData = (y, index) => ({
  index: index + 1,
  name: y?.food?.name || "",
  price: y?.food?.price || "",
  food_id: y?.food?.id || "",
  quantity: y?.foodOrder?.quantity || "",
  email: y?.user?.email,
});

// food: {id: 2, title: "Seafood", name: "Crab", rating: 5, price: 200000, quantityType: "PACKAGE",…}
// foodOrder: {id: 16, quantity: 1, food_id: 2, createdAt: "2022-01-18T19:40:47", email: "tttriet19977@gmail.com"}
// user: {id: 2, email: "tttriet19977@gmail.com", phone: "0819541897",…}

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
