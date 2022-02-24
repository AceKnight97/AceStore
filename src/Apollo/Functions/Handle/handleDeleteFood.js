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
