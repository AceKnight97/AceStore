import axios from "axios";
import { CONFIG } from "../../../Constants";

const handleCreateAnyCustomerOrder = async (variables) => {
  try {
    const res = await axios.post(
      `${CONFIG.APOLLO_HOST_URL}/api/foodorder/createanycustomerorder`,
      variables
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handleCreateAnyCustomerOrder;
