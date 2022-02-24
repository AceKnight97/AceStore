import gql from "graphql-tag";
import createClient from "../../apolloClient";

const ADD_FOOD = gql`
  mutation addFood($input: [AddFoodInput]!) {
    addFood(input: $input) {
      isSuccess
      message
    }
  }
`;

const handleAddFood = async (variables = {}) => {
  try {
    const client = await createClient();
    const result = await client.mutate({
      mutation: ADD_FOOD,
      variables,
    });
    const { addFood } = result?.data;
    return addFood;
  } catch (error) {
    throw error;
  }
};

export default handleAddFood;
