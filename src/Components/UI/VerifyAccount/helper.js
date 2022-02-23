import handleSendVerifyCode from "../../../Apollo/Functions/Handle/handleSendVerifyCode";
import handleVerifiedEmail from "../../../Apollo/Functions/Handle/handleVerifiedEmail";

export const mutationVerifiedEmail = async (verificationCode) => {
  let res;
  try {
    res = await handleVerifiedEmail({ verificationCode });
  } catch (error) {
    console.log("Failed to verify code: ", error);
  }
  console.log({ res });
  if (res.isSuccess) {
    alert("Verify code successfully!");
    return res;
  } else {
    alert("Verify code unsuccessfully!");
    return { isSuccess: false };
  }
};

export const mutationSendCode = async () => {
  let res;
  try {
    res = await handleSendVerifyCode();
  } catch (error) {
    console.log("Failed to send verify code: ", error);
  }
  console.log({ res });
  if (res.isSuccess) {
    alert("Send verify code successfully!");
    return res;
  } else {
    alert("Send verify code unsuccessfully!");
    return { isSuccess: false };
  }
};
