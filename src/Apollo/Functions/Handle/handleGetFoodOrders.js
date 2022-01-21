import axios from "axios";
import { CONFIG } from "../../../Constants";

const handleGetFoodOrders = async (variables = {}) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/adminhistory`,
      data: variables,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handleGetFoodOrders;
