import gql from "graphql-tag";

export const TEMP = "";

const FOOD_ORDER = gql`
  {
    id
    food
    quantity
    createdAt
    email
    notes
    status
    price
    destination
  }
`;

export default FOOD_ORDER;
