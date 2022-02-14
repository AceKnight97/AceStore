import handleLogin from "../../../Apollo/Functions/Handle/handleLogin";
import { isValidEmail } from "../../../Utils";

export const mutationSignIn = async (data = {}) => {
  const { email, password } = data;
  try {
    return await handleLogin({ email, password });
  } catch (error) {
    return { isSuccess: false, message: "Incorrect password" };
  }
};

export const checkValidLogin = (state = {}) => {
  const { email, password } = state;
  if (!isValidEmail(email)) {
    return { emailErr: "Incorrect email" };
  }
  if (password.length < 6) {
    return { passwordErr: "Incorrect password" };
  }
  return { isSuccess: true };
};
