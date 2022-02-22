// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import { client } from "../../apolloClient";
import USER from "../../Fragments/user";

const SIGN_IN = gql`
  mutation signIn($phone: String!, $password: String!) {
    signIn(phone: $phone, password: $password) {
      isSuccess
      data {
        token
        user {
          ...${USER}
        }
      }
    }
  }
`;

const handleLogin = async (variables) => {
  try {
    // const res = await axios.post(
    //   `${CONFIG.APOLLO_HOST_URL}/api/public/login`,
    //   variables
    // );
    // return res.data;
    const result = await client.mutate({
      mutation: SIGN_IN,
      variables,
    });
    const { signIn } = result?.data;
    return signIn;
  } catch (error) {
    throw error;
  }
};

export default handleLogin;
