import gql from "graphql-tag";
import createClient from "../../apolloClient";

const RESEND_VERIFIED_EMAIL = gql`
  mutation resendVerifiedEmail {
    resendVerifiedEmail {
      isSuccess
      message
    }
  }
`;

const handleSendVerifyCode = async (variables) => {
  try {
    const client = await createClient();
    const result = await client.mutate({
      mutation: RESEND_VERIFIED_EMAIL,
      variables,
    });
    const { resendVerifiedEmail } = result?.data;
    return resendVerifiedEmail;
  } catch (error) {
    throw error;
  }
};

export default handleSendVerifyCode;
