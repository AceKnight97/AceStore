
import { isValidEmail } from '../../../Utils'

export const handleRightBtnClick = (state = {}) => {
  const {
    email, password, confirmPassword,
    username, phone, address, notes,
    loading, isStep1
  } = state;
  if (isStep1) {
    if (password.length < 6) {
      return { passwordErr: 'Password must have 6 or more characters' }
    }
    if (password !== confirmPassword) {
      return { confirmPasswordErr: 'Confirm password is not match' }
    }
    if (!isValidEmail(email)) {
      return { emailErr: 'Incorrect email format' }
    }
    return { isStep1: false };
  } else {
    if (phone.length < 9) {
      return {}
    }
    return { finish: true };
  }


}


export const disabledRegister = (state = {}) => {
  const {
    email, password, confirmPassword,
    username, phone, address, notes,
    loading, isStep1
  } = state;

  if (isStep1) {
    if (!email || !password || !confirmPassword) {
      return true;
    }
  } else {
    if (!username || !phone || !address || !notes) {
      return true;
    }
  }
  return false;

}