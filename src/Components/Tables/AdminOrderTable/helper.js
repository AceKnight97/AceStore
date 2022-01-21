import { getPrice } from "../../../Helpers";
import handleCreateOrder from "../../../Apollo/Functions/Handle/handleCreateOrder";

export const a = "a";

export const mutationCloneOrder = async (data = {}) => {
  console.log({ data });
  const sendingData = _.map(data, (x) => ({
    food_id: x.food_id,
    quantity: x.quantity,
    email: x.email,
  }));
  console.log({ sendingData });
  return await handleCreateOrder(sendingData);
};
