import { data } from "jquery";
import handleRegister from "../../../Apollo/Functions/Handle/handleRegister";
import { isValidEmail } from "../../../Utils";

export const handleRightBtnClick = (state = {}) => {
  const {
    email,
    password,
    confirmPassword,
    username,
    phone,
    address,
    notes,
    loading,
    isStep1,
  } = state;
  if (isStep1) {
    if (password.length < 6) {
      return { passwordErr: "Password must have 6 or more characters" };
    }
    if (password !== confirmPassword) {
      return { confirmPasswordErr: "Confirm password is not match" };
    }
    if (!isValidEmail(email)) {
      return { emailErr: "Incorrect email format" };
    }
    return { isStep1: false };
  } else {
    if (phone.length < 9) {
      return {};
    }
    return { finish: true };
  }
};

export const disabledRegister = (state = {}) => {
  const {
    email,
    password,
    confirmPassword,
    username,
    phone,
    address,
    notes,
    loading,
    isStep1,
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
};

export const mutationCreateUser = async (data) => {
  console.log({ data });
  const { email, username, password, phone, address, notes } = data;
  const res = await handleRegister({
    email,
    username,
    password,
    phone,
    address,
    notes,
  });
  return res;
};

export const setDefaultData = () => {
  const data = {
    email: "tttriet19977@gmail.com",
    password: "0819541897",
    confirmPassword: "0819541897",
    username: "AceKnight",
    phone: "0819541897",
    address: "329 le van Luong, P.Tan Quy, Q.7, TPHCM",
    notes: "Soon",
  };
  return data;
};
