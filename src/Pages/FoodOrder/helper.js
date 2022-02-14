import handleCreateAnyCustomerOrder from "../../Apollo/Functions/Handle/handleCreateAnyCustomerOrder";
import handleCreateOrder from "../../Apollo/Functions/Handle/handleCreateOrder";

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
    food: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    email,
    notes,
    status: "Pending",
    price: x.price,
  }));
  console.log({ sendingData, foodData });
  try {
    const res = await handleCreateOrder({ input: sendingData });
    return res;
  } catch (error) {
    console.log("Failed to create order: ", { error });
    return { isSuccess: false, message: error };
  }
};

export const createOrderForAnyCustomer = async (
  foodData = [],
  anyCustomerData = {}
) => {
  const { email, username, address, phone, notes } = anyCustomerData;
  const orders = foodData.map((x) => ({
    food: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    email,
    notes,
    status: "Pending",
    price: x.price,
    destination: "",
  }));
  const customer = { email, username, address, phone, password: phone };
  const sendingData = { orders, customer };
  // console.log({ foodData, anyCustomerData, sendingData });
  try {
    return await handleCreateAnyCustomerOrder({ input: sendingData });
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};
