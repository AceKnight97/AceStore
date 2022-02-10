import { getPrice } from "../../../Helpers";
import handleCreateOrder from "../../../Apollo/Functions/Handle/handleCreateOrder";

export const getOrderTotal = (data = []) => {
  // console.log({ data });
  let total = 0;
  _.forEach(data, (x) => {
    total += x.price * x.quantity;
  });
  return getPrice(total, undefined, "");
};

export const mutationCloneOrder = async (data = {}) => {
  console.log({ data });
  const sendingData = _.map(data, (x) => ({
    food: x.food,
    quantity: x.quantity,
    email: x.email,
    notes: x.notes,
    status: x.status,
    price: x.price,
    destination: x.destination,
  }));
  console.log({ sendingData });
  return await handleCreateOrder(sendingData);
};
