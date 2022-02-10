import gql from "graphql-tag";

export const TEMP = "";

const FOOD = gql`
  {
    id
    title
    name
    rating
    price
    quantityType
    createdAt
  }
`;

export default FOOD;
