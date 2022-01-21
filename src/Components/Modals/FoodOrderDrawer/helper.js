import handeUpdateFoodOrderStatus from "../../../Apollo/Functions/Handle/handeUpdateFoodOrderStatus";

export const a = "";

export const mutationChangeStatus = async (food_id = "", status = "") => {
  const sendingData = {
    food_id,
    status,
  };
  try {
    const res = await handeUpdateFoodOrderStatus(sendingData);
    return res;
  } catch (error) {
    throw error;
  }
};
