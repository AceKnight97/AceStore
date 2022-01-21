import axios from "axios";
import { CONFIG } from "../../../Constants";

const handeUpdateFoodOrderStatus = async (variables = {}) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/changeorderstatus`,
      data: variables,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handeUpdateFoodOrderStatus;
