// import axios from "axios";
// import { CONFIG } from "../../../Constants";
import gql from "graphql-tag";
import { client } from "../../apolloClient";

const MENU = gql`
  query menu {
    menu {
      id
      title
      name
      rating
      price
      quantityType
      createdAt
      image
    }
  }
`;

const fetchMenu = async () => {
  try {
    // const res = await axios.get(`${CONFIG.APOLLO_HOST_URL}/api/canteen/menu`);
    const res = await client.query({
      query: MENU,
    });
    const { menu } = res?.data || {};
    // return res.data;
    return menu;
  } catch (error) {
    throw error;
  }
};

export default fetchMenu;
