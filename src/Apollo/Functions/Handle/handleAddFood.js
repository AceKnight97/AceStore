import axios from "axios";
import { CONFIG } from "../../../Constants";

const handleAddFood = async (variables) => {
  try {
    const res = await axios.post(
      `${CONFIG.APOLLO_HOST_URL}/api/canteen/addfood`,
      variables
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handleAddFood;
