import handeUpdateFoodOrderStatus from "../../../Apollo/Functions/Handle/handeUpdateFoodOrderStatus";

export const a = "";

export const mutationChangeStatus = async (food = "", status = "") => {
  const sendingData = {
    food,
    status,
  };
  try {
    const res = await handeUpdateFoodOrderStatus(sendingData);
    return res;
  } catch (error) {
    throw error;
  }
};
