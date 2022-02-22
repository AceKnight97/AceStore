import { data } from "jquery";
import handleRegister from "../../../Apollo/Functions/Handle/handleRegister";
import { checkServerErr, formatPhone } from "../../../Helpers";
import { isValidEmail } from "../../../Utils";

export const handleRightBtnClick = (state = {}) => {
  const { password, confirmPassword, phone } = state;
  if (password.length < 6) {
    return { passwordErr: "Password must have 6 or more characters" };
  }
  if (password !== confirmPassword) {
    return { confirmPasswordErr: "Confirm password is not match" };
  }
  // if (!isValidEmail(email)) {
  //   return { emailErr: "Incorrect email format" };
  // }
  if (phone.length < 8) {
    return { phoneErr: "Invalid phone number!" };
  }
};

export const disabledRegister = (state = {}) => {
  const { password, confirmPassword, phone, address } = state;

  if (!phone || !address || !password || !confirmPassword) {
    return true;
  }
  return false;
};

export const mutationCreateUser = async (data) => {
  const { password, phone, address } = data;
  try {
    return await handleRegister({
      phone: formatPhone(phone),
      password,
      address,
    });
  } catch (error) {
    console.log("Failed to create user: ", error);
    return {
      isSuccess: false,
      message: checkServerErr(error),
    };
  }
};

export const setDefaultData = () => {
  const data = {
    email: "tttriet19977@gmail.com",
    password: "0819541897",
    confirmPassword: "0819541897",
    username: "AceKnight",
    phone: "0819541897",
    address: "329 le van Luong, P.Tan Quy, Q.7, TPHCM",
  };
  return data;
};
