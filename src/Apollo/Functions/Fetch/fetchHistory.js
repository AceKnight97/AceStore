import axios from "axios";
import { CONFIG } from "../../../Constants";
import auth from "../../../Helpers/auth";
import gql from "graphql-tag";
import createClient from "../../apolloClient";

const MENU = gql`
  query orderHistory($date: String!, $isAll: Boolean) {
    orderHistory(date: $date, isAll: $isAll) {
      id
      food
      quantity
      createdAt
      email
      notes
      status
      price
    }
  }
`;

const fetchHistory = async (variables = {}) => {
  try {
    // const email = auth.getDataLogin()?.email;
    // const res = await axios({
    //   method: "get",
    //   url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/history/${email}`,
    // });
    // const res = await axios({
    //   method: "GET",
    //   url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/historywithtoken`,
    //   headers: {
    //     Authorization:  auth.getToken(),
    //   },
    // });

    const client = await createClient();
    const res = await client.query({
      query: MENU,
      variables,
    });
    const { orderHistory } = res?.data || {};
    // return res.data;
    return orderHistory;
  } catch (error) {
    throw error;
  }
};

export default fetchHistory;
