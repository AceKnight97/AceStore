import axios from "axios";
import { CONFIG } from "../../../Constants";

const fetchMasterData = async () => {
  try {
    const res = await axios.get(`${CONFIG.APOLLO_HOST_URL}/masterdata`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default fetchMasterData;
