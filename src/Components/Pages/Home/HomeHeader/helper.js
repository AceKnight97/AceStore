import handleLogin from "../../../../Apollo/Functions/Handle/handleLogin";

export const a = '';

export const mutationSignIn = async () => {
    // data = {}
    // const { email, password } = data;
    return await handleLogin({ email:"email", password:"password" });
  };