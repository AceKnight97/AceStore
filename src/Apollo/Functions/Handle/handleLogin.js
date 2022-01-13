import axios from "axios";
import { CONFIG } from "../../../Constants";

const handleLogin = async (variables) => {
  try {
    const res = await axios.post(
      `${CONFIG.APOLLO_HOST_URL}/api/public/login`,
      variables
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default handleLogin;
