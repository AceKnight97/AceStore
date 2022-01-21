import handleCreateAnyCustomerOrder from "../../Apollo/Functions/Handle/handleCreateAnyCustomerOrder";
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

export const mutationCreateOrder = async (
  foodData = [],
  email = "",
  notes = ""
) => {
  const sendingData = foodData.map((x) => ({
    food_id: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    email,
    notes,
    status: "Pending",
  }));
  // console.log({ data, sendingData });
  return await handleCreateOrder(sendingData);
};

export const createOrderForAnyCustomer = async (
  foodData = [],
  anyCustomerData = {}
) => {
  const { email, username, address, phone, notes } = anyCustomerData;
  const food = foodData.map((x) => ({
    // FoodOrder
    food_id: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    email,
    notes,
    status: "Pending",
  }));
  const customer = { email, username, address, phone, password: phone };
  const sendingData = { food, customer };
  console.log({ foodData, anyCustomerData, sendingData });
  return await handleCreateAnyCustomerOrder(sendingData);
};
