import gql from "graphql-tag";

export const TEMP = "";

const FOOD_ORDER = gql`
  {
    id
    food
    quantity
    createdAt
    notes
    status
    price
    destination
  }
`;

export default FOOD_ORDER;
