// import axios from "axios";
// import { CONFIG } from "../../../Constants";
// import useSubsription from "@apollo/react-hooks";
import { UndoOutlined } from "@ant-design/icons";
import { useSubscription } from "@apollo/client";
import { Button } from "antd";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { showSuccessMsg } from "../../../Utils/showNotification";
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
  const oldData = useRef();
  const { data, loading } = useSubscription(NEW_FOOD_ORDERS);
  const onClick = () => {
    props.updateOrders();
    oldData.current = data;
  };
  // console.log({ data, loading });
  if (
    data?.newFoodOrders &&
    data?.newFoodOrders?.length !== 0 &&
    !_.isEqual(data, oldData.current)
  ) {
    showSuccessMsg(
      "New food order(s) arrived!",
      undefined,
      "Press refresh to load more food order(s)"
    );
    return (
      <Button type="primary" onClick={onClick} className={props.className}>
        <UndoOutlined />
      </Button>
    );
  }
  return null;
};

SubscribeNewFoodOrders.defaultProps = {
  className: "",
  updateOrders: () => {},
  isShowBtn: false,
};
SubscribeNewFoodOrders.propTypes = {
  className: PropTypes.string,
  updateOrders: PropTypes.func,
  isShowBtn: PropTypes.bool,
};

export default SubscribeNewFoodOrders;
