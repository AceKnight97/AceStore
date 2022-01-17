import axios from "axios";
import { CONFIG } from "../../../Constants";
import auth from "../../../Helpers/auth";

const fetchHistory = async () => {
  try {
    const Authorization = auth.getToken();
    const variables = JSON.stringify({ email: auth.getDataLogin()?.email });
    console.log({ variables });
    // const res = await axios.get(
    //   `${CONFIG.APOLLO_HOST_URL}/api/foodorder/history`,
    //   variables
    // );
    const res = await axios({
      method: "GET",
      url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/historywithtoken`,
      headers: {
        Authorization,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default fetchHistory;
