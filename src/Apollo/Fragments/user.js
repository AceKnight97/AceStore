import gql from "graphql-tag";

export const TEMP = "";

const USER = gql`
  {
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
    isVerified
  }
`;

export default USER;
