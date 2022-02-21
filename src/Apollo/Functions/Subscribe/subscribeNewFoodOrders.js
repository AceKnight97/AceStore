// import axios from "axios";
// import { CONFIG } from "../../../Constants";
// import useSubsription from "@apollo/react-hooks";
import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const NEW_FOOD_ORDERS = gql`
  subscription newFoodOrders {
    newFoodOrders {
      food {
        id
      }
      foodOrder {
        id
        food
      }
      user {
        id
        username
        email
      }
    }
  }
`;

const subscribeNewFoodOrders = () => {
  const { data, loading } = useSubscription(NEW_FOOD_ORDERS);
  return <h4>New rates: {!loading && data}</h4>;
};

export default subscribeNewFoodOrders;
