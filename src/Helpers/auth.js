const { localStorage } = global.window;

const auth = {
  login(data) {
    console.log("login data: ", data);
    const { user, isSuccess, token } = data;

    localStorage.isSuccess = isSuccess;
    localStorage.token = token;
    localStorage.user = JSON.stringify(user);
    localStorage.role = user.role;
  },

  getRole() {
    return localStorage.role;
  },

  setMenu(data) {
    localStorage.menu = JSON.stringify(data);
  },

  getMenu() {
    return localStorage.menu && localStorage.menu !== "undefined"
      ? JSON.parse(localStorage.menu)
      : [];
  },

  setKindOfFood(data) {
    localStorage.kindOfFood = JSON.stringify(data);
  },

  getKindOfFood() {
    return localStorage.kindOfFood && localStorage.kindOfFood !== "undefined"
      ? JSON.parse(localStorage.kindOfFood)
      : [];
  },

  getToken() {
    return localStorage.token;
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

  setIsOrderHere(val = false) {
    localStorage.isOrderHere = JSON.stringify(val);
  },

  getIsOrderHere() {
    return localStorage.isOrderHere && localStorage.isOrderHere !== "undefined"
      ? JSON.parse(localStorage.isOrderHere)
      : false;
  },

  isSuccess() {
    return localStorage.isSuccess;
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
