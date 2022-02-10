import axios from "axios";
import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import { client } from "../../apolloClient";

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      isSuccess
      data {
        token
        user {
          id
          username
          email
          role
          signUpDate
          status
          gender
          address
          phone
          dob
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
