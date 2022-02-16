// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import createClient from "../../apolloClient";

const CHANGE_ORDER_STATUS = gql`
  mutation changeOrderStatus($status: String!, $orderId: ID!) {
    changeOrderStatus(status: $status, orderId: $orderId) {
      isSuccess
      message
    }
  }
`;

const handeUpdateFoodOrderStatus = async (variables = {}) => {
  try {
    // const res = await axios({
    //   method: "PUT",
    //   url: `${CONFIG.APOLLO_HOST_URL}/api/foodorder/changeorderstatus`,
    //   data: variables,
    // });
    // return res.data;
    const client = await createClient();
    const result = await client.mutate({
      mutation: CHANGE_ORDER_STATUS,
      variables,
    });
    const { changeOrderStatus } = result?.data;
    return changeOrderStatus;
  } catch (error) {
    throw error;
  }
};

export default handeUpdateFoodOrderStatus;
