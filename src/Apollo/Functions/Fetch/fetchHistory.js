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
