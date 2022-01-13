const { localStorage } = global.window;

const auth = {
  login(data) {
    console.log("login data: ", data);
    const { user, isSuccess } = data;
    const { username, _id } = user;

    localStorage.username = username;
    localStorage.userId = _id;
    localStorage.isSuccess = isSuccess;
    localStorage.role = user.role;
  },

  setFoodData(data) {
    localStorage.foodData = JSON.stringify(data);
  },
  getFoodData() {
    return localStorage.foodData && localStorage.foodData !== "undefined"
      ? JSON.parse(localStorage.foodData)
      : [];
  },

  setMasterData(data) {
    localStorage.masterData = JSON.stringify(data);
  },
  getMasterData() {
    return localStorage.masterData && localStorage.masterData !== "undefined"
      ? JSON.parse(localStorage.masterData)
      : [];
  },

  setDatalogin(data) {
    localStorage.login = JSON.stringify(data);
  },

  getDataLogin() {
    return localStorage.login && localStorage.login !== "undefined"
      ? JSON.parse(localStorage.login)
      : {};
  },

  isSuccess() {
    return localStorage.isSuccess;
  },

  userId() {
    return localStorage.userId;
  },

  username() {
    return localStorage.userName;
  },

  role() {
    return localStorage.role; // || 'MD'; // || 'NURSE';
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
