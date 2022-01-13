import axios from "axios";
import { CONFIG } from "../../../Constants";

const fetchMenu = async () => {
  try {
    const res = await axios.get(`${CONFIG.APOLLO_HOST_URL}/api/canteen/menu`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default fetchMenu;
