import moment from "moment";
import fetchOrderHistory from "../../Apollo/Functions/Fetch/fetchOrderHistory";
import { getOrderTotal } from "../../Helpers";
import { sortBy } from "../../Utils";

export const e = "";

const groupOrderHis = (xs) => {
  return xs.reduce((rv, x) => {
    (rv[x.foodOrder?.createdAt] = rv[x.foodOrder?.createdAt] || []).push(x);
    return rv;
  }, {});
};

const formatOrderHisData = (y, index) => ({
  // index: index + 1,
  name: y?.food?.name || "",
  price: y?.foodOrder?.price || "",
  food: y?.food?.id || "",
  quantity: y?.foodOrder?.quantity || "",
});

export const getOrderHistory = (res = [], addMore = 0) => {
  const orderHistory = [];
  const grouped = groupOrderHis(res);
  // console.log({ grouped });
  Object.keys(grouped).forEach((x, i) => {
    const data = grouped[x].map((y, index) => formatOrderHisData(y, index));
    orderHistory.push({
      index: i + addMore,
      date: x,
      data,
      notes: grouped[x]?.[0]?.foodOrder?.notes || "",
      destination:
        grouped[x]?.[0]?.foodOrder?.destination ||
        grouped[x]?.[0]?.user?.address ||
        "",
      status: grouped[x]?.[0]?.foodOrder?.status || "",
      username: grouped[x]?.[0]?.user?.username || "",
      total: getOrderTotal(data),
      address: grouped[x]?.[0]?.user?.address || "",
      phone: grouped[x]?.[0]?.user?.phone || "",
      user: grouped[x]?.[0]?.user || {},
      foodOrderId: grouped[x]?.[0]?.foodOrder?.id || "",
    });
  });
  return sortBy(
    orderHistory,
    (x, y) => moment(y.date).valueOf() - moment(x.date).valueOf()
  );
};

export const mutationGetFoodOrders = async (filterObj = {}) => {
  const { currentDate, isAll } = filterObj;
  const sendingData = {
    date: moment(currentDate).format("DD/MM/YYYY"),
    isAll,
  };
  // console.log({ sendingData });
  try {
    const res = await fetchOrderHistory(sendingData);
    return getOrderHistory(res);
  } catch (error) {
    console.log("Failed to get food orders: ", error);
    return [];
  }
};
