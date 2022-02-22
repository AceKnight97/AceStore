import gql from "graphql-tag";
import USER from "../Fragments/user";

const ROOT_SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      isSuccess
      token
      user {
        ...${USER}
      }
    }
  }
`;

export default ROOT_SIGN_IN;
