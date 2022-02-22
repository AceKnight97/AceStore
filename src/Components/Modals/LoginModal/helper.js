import handleLogin from "../../../Apollo/Functions/Handle/handleLogin";
import { formatPhone } from "../../../Helpers";
import { isValidEmail } from "../../../Utils";

export const mutationSignIn = async (data = {}) => {
  const { phone, password } = data;
  try {
    return await handleLogin({ phone: formatPhone(phone), password });
  } catch (error) {
    return { isSuccess: false, message: "Incorrect password" };
  }
};

export const checkValidLogin = (state = {}) => {
  const { phone, password } = state;
  // if (!isValidEmail(phone)) {
  //   return { phoneErr: "Incorrect phone number" };
  // }
  if (password.length < 6) {
    return { passwordErr: "Incorrect password" };
  }
  return { isSuccess: true };
};
