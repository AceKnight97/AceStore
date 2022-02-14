// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import { client } from "../../apolloClient";

const ADD_FOOD = gql`
  mutation createAnyCustomerOrder($input: AnyCustomerOrderInput!) {
    createAnyCustomerOrder(input: $input) {
      isSuccess
      message
    }
  }
`;

const handleCreateAnyCustomerOrder = async (variables) => {
  try {
    // const res = await axios.post(
    //   `${CONFIG.APOLLO_HOST_URL}/api/foodorder/createanycustomerorder`,
    //   variables
    // );
    // return res.data;
    const result = await client.mutate({
      mutation: ADD_FOOD,
      variables,
    });
    const { createAnyCustomerOrder } = result?.data;
    return createAnyCustomerOrder;
  } catch (error) {
    throw error;
  }
};

export default handleCreateAnyCustomerOrder;
