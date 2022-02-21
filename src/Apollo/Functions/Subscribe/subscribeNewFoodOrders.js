// import axios from "axios";
// import { CONFIG } from "../../../Constants";
// import useSubsription from "@apollo/react-hooks";
import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import FOOD from "../../Fragments/food";
import FOOD_ORDER from "../../Fragments/foodOrder";
import USER from "../../Fragments/user";

const NEW_FOOD_ORDERS = gql`
  subscription newFoodOrders {
    newFoodOrders {
      food {
        ...${FOOD}
      }
      foodOrder {
        ...${FOOD_ORDER}
      }
      user {
        ...${USER}
      }
    }
  }
`;

const SubscribeNewFoodOrders = (props) => {
  const { data, loading } = useSubscription(NEW_FOOD_ORDERS);
  console.log({ data, loading });
  return <h4>New rates: </h4>;
};

SubscribeNewFoodOrders.defaultProps = {
  className: "",
};
SubscribeNewFoodOrders.propTypes = {
  className: PropTypes.string,
};

export default SubscribeNewFoodOrders;
