import axios from "axios";
import { CONFIG } from "../../../Constants";

const handleRegister = async (variables) => {
  try {
    const res = await axios.post(
      `${CONFIG.APOLLO_HOST_URL}/api/user/createuser`,
      variables
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handleRegister;
