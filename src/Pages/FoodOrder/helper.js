import handleCreateAnyCustomerOrder from "../../Apollo/Functions/Handle/handleCreateAnyCustomerOrder";
import handleCreateOrder from "../../Apollo/Functions/Handle/handleCreateOrder";
import { formatPhone, getPrice } from "../../Helpers";

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
  notes = "",
  destination = ""
) => {
  const sendingData = foodData.map((x) => ({
    food: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    notes,
    status: "Pending",
    price: x.price,
    destination,
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
  const { phone, address, notes } = anyCustomerData;
  const orders = foodData.map((x) => ({
    food: x.id,
    quantity: parseFloat(x.quantity.slice(0, 3)),
    notes,
    status: "Pending",
    price: x.price,
    destination: address,
  }));
  const customer = { phone: formatPhone(phone), address, password: phone };
  const sendingData = { orders, customer };
  // console.log({ foodData, anyCustomerData, sendingData });
  try {
    return await handleCreateAnyCustomerOrder({ input: sendingData });
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

export const generateColumns = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (cell) => getPrice(cell, undefined, ""),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
  ];
  return columns;
};
