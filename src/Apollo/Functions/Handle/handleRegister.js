// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import { client } from "../../apolloClient";

const SIGN_UP = gql`
  mutation signUp($phone: String!, $password: String!, $address: String!) {
    signUp(phone: $phone, password: $password, address: $address) {
      isSuccess
      token
    }
  }
`;

const handleRegister = async (variables) => {
  try {
    // const res = await axios.post(
    //   `${CONFIG.APOLLO_HOST_URL}/api/user/createuser`,
    //   variables
    // );
    // return res.data;
    const result = await client.mutate({
      mutation: SIGN_UP,
      variables,
    });
    const { signUp } = result?.data;
    return signUp;
  } catch (error) {
    throw error;
  }
};

export default handleRegister;
