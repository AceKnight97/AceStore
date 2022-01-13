import handleCreateOrder from "../../Apollo/Functions/Handle/handleCreateOrder";
import auth from "../../Helpers/auth";

export const temp = "";

export const getFoodData = (foodData = []) => {
  const arr = [];
  let index = 1;
  _.forEach(foodData, (x) => {
    _.forEach(x.data || [], (y) => {
      if (y.isBuy) {
        // console.log({ y });
        arr.push({ ...y, index });
        index += 1;
      }
    });
  });
  // console.log({ arr });
  return arr;
};

export const mutationCreateOrder = async (data = [], email = "") => {
  const sendingData = data.map((x) => ({
    // name: x.name,
    // price: x.price,
    food_id: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    email,
    // quantityType: x.quantityType,
  }));
  console.log({ data, sendingData });
  return await handleCreateOrder(sendingData);
};
