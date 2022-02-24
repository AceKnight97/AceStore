import gql from "graphql-tag";
import createClient from "../../apolloClient";
import FOOD from "../../Fragments/food";
import FOOD_ORDER from "../../Fragments/foodOrder";
import USER from "../../Fragments/user";

const ORDER_HISTORY = gql`
  query orderHistory($date: String!, $isAll: Boolean) {
    orderHistory(date: $date, isAll: $isAll) {
      food {
        ...${FOOD}
      }
      foodOrder {
        ...${FOOD_ORDER}
      }
      user {
        ...${USER}
      }
    }
  }
`;

const fetchOrderHistory = async (variables = {}) => {
  try {
    const client = await createClient();
    const res = await client.query({
      query: ORDER_HISTORY,
      variables,
    });
    const { orderHistory } = res?.data || {};
    // return res.data;
    return orderHistory;
  } catch (error) {
    throw error;
  }
};

export default fetchOrderHistory;
