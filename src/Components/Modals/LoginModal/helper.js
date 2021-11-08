import { isValidEmail } from "../../../Utils";

export const mutationSignIn = () => {

};

export const checkValidLogin = (state = {}) => {
  const { email, password } = state;
  if (!isValidEmail(email)) {
    return { emailErr: 'Incorrect email' }
  }
  if (password.length < 6) {
    return { passwordErr: 'Incorrect password' }
  }
  return { isSuccess: true };
}