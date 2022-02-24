import handleChangePassword from "../../../Apollo/Functions/Handle/handleChangePassword";

export const a = "";

export const mutationChangePassword = async (
  password = "",
  newPassword = ""
) => {
  let res;
  try {
    res = await handleChangePassword({ password, newPassword });
    // console.log({ res });
  } catch (error) {
    console.log("Failed to change password: ", error);
  }
  if (res.isSuccess) {
    alert("Successfully changing password!");
  } else {
    alert("Unsuccessfully changing password!");
  }
  return res;
};
