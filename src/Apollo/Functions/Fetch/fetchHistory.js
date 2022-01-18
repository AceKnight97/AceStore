import axios from "axios";
import { CONFIG } from "../../../Constants";
import auth from "../../../Helpers/auth";

const fetchHistory = async () => {
  try {
    const email = auth.getDataLogin()?.email;
    const res = await axios({
      method: "get",
      url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/history/${email}`,
    });
    // const res = await axios({
    //   method: "GET",
    //   url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/historywithtoken`,
    //   headers: {
    //     Authorization:  auth.getToken(),
    //   },
    // });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default fetchHistory;
