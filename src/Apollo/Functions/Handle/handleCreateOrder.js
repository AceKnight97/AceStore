// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import createClient from "../../apolloClient";

const CREATE_ORDER = gql`
  mutation createOrder($input: [OrderInput]!) {
    createOrder(input: $input) {
      isSuccess
      message
    }
  }
`;

const handleCreateOrder = async (variables) => {
  try {
    const client = await createClient();
    const res = await client.mutate({
      mutation: CREATE_ORDER,
      variables,
    });
    const { createOrder } = res?.data || {};
    // return res.data;
    return createOrder;
  } catch (error) {
    throw error;
  }
};

export default handleCreateOrder;
