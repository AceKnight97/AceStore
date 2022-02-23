import gql from "graphql-tag";
import createClient from "../../apolloClient";

const VERIFIED_EMAIL = gql`
  mutation verifiedEmail($verificationCode: String!) {
    verifiedEmail(verificationCode: $verificationCode) {
      isSuccess
      message
    }
  }
`;

const handleVerifiedEmail = async (variables) => {
  try {
    const client = await createClient();
    const result = await client.mutate({
      mutation: VERIFIED_EMAIL,
      variables,
    });
    const { verifiedEmail } = result?.data;
    return verifiedEmail;
  } catch (error) {
    throw error;
  }
};

export default handleVerifiedEmail;
