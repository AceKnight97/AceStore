import gql from "graphql-tag";
import createClient from "../../apolloClient";

const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword) {
      isSuccess
      message
    }
  }
`;

const handleChangePassword = async (variables = {}) => {
  try {
    const client = await createClient();
    const result = await client.mutate({
      mutation: CHANGE_PASSWORD,
      variables,
    });
    const { changePassword } = result?.data;
    return changePassword;
  } catch (error) {
    throw error;
  }
};

export default handleChangePassword;
