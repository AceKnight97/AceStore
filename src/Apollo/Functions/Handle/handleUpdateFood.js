// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import createClient from "../../apolloClient";

const UPDATE_FOOD = gql`
  mutation updateFood($input: [UpdateFoodInput]!) {
    updateFood(input: $input) {
      isSuccess
      message
    }
  }
`;

const handleUpdateFood = async (variables = {}) => {
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
      mutation: UPDATE_FOOD,
      variables,
    });
    const { updateFood } = result?.data;
    return updateFood;
  } catch (error) {
    throw error;
  }
};

export default handleUpdateFood;
