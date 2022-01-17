import axios from "axios";
import { CONFIG } from "../../../Constants";

const handleAddFood = async (variables = {}, isAdd = false) => {
  try {
    const res = await axios({
      method: isAdd ? "POST" : "PUT",
      url: `${CONFIG.APOLLO_HOST_URL}/api/canteen/${
        isAdd ? "addfood" : "updatefood"
      }`,
      data: variables,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handleAddFood;
