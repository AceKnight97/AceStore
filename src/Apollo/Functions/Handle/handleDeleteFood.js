// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import createClient from "../../apolloClient";

const DELETE_FOOD = gql`
  mutation deleteFood($input: [ID]!) {
    deleteFood(input: $input) {
      isSuccess
      message
    }
  }
`;

const handleDeleteFood = async (variables = {}) => {
  try {
    // const res = await axios({
    //   method: isAdd ? "POST" : "PUT",
    //   url: `${CONFIG.APOLLO_HOST_URL}/api/canteen/${
    //     isAdd ? "addfood" : "updatefood"
    //   }`,
    //   data: variables,
    // });
    // return res.data;
    const client = await createClient();
    const result = await client.mutate({
      mutation: DELETE_FOOD,
      variables,
    });
    const { deleteFood } = result?.data;
    return deleteFood;
  } catch (error) {
    throw error;
  }
};

export default handleDeleteFood;
