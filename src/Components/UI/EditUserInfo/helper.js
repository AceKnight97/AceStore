import moment from "moment";
import handleUpdateUser from "../../../Apollo/Functions/Handle/handleUpdateUser";

export const a = "";

export const mutationUpdateUser = async (data = {}) => {
  const { email, username, gender, address, dob } = data;
  const sendingData = {
    email,
    username,
    gender,
    address,
    dob: moment(dob).toISOString(),
  };
  // console.log({ sendingData });
  try {
    const res = await handleUpdateUser({
      profileInput: sendingData,
    });
    return res;
  } catch (error) {
    console.log("Failed to update user: ", error);
    return { isSuccess: false, message: error };
  }
};
