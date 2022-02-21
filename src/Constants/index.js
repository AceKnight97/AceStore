const APP_FLOW_ACTIONS = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_COMPLETE: "LOGIN_COMPLETE",

  GET_ALL_DATA_REQUEST: "GET_ALL_DATA_REQUEST",
  GET_ALL_DATA_COMPLETE: "GET_ALL_DATA_COMPLETE",

  RELOAD_PAGE_REQUEST: "RELOAD_PAGE_REQUEST",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_COMPLETE: "LOGOUT_COMPLETE",

  NEW_FOOD_ORDERS: "NEW_FOOD_ORDERS",
};
export default APP_FLOW_ACTIONS;

export const PAGE_MANAGER = {
  HOME_PAGE: "https://github.com/AceKnight97/staticpromotionalwebsite",
  HOME: "/acestore",
  OUR_TEAM: "/our-team",
  MY_CV: "/staticpromotionalwebsite",
  BUSINESS: "/business",
  CONTACT: "/contact",
  LIGHT_NOVEL: "/light-novel",
};
export const CONFIG = {
  // APOLLO_HOST_URL: "retail-store-java.herokuapp.com/graphql",
  APOLLO_HOST_URL: "localhost:8080/graphql",
};

export const MESSAGES = {
  EXPIRED_TOKEN: "Your login session has expired, please login again.",
};

export const EMITTER_CONSTANTS = {
  CONNECT: "",
  TEST: "",
  NEW_CARE_PLAN: "NEW_CARE_PLAN",
};
