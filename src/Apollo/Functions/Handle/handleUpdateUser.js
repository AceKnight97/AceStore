// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import createClient from "../../apolloClient";
import USER from "../../Fragments/user";

const UPDATE_USER = gql`
  mutation updateUser($profileInput: ProfileInput!) {
    updateUser(profileInput: $profileInput) {
      isSuccess
      message
      user{
        ...${USER}
      }
    }
  }
`;

const handleUpdateUser = async (variables = {}) => {
  try {
    const client = await createClient();
    const result = await client.mutate({
      mutation: UPDATE_USER,
      variables,
    });
    const { updateUser } = result?.data;
    return updateUser;
  } catch (error) {
    throw error;
  }
};

export default handleUpdateUser;
