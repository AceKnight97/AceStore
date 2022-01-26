import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Button } from "antd";
import { useMergeState } from "../../Helpers/customHooks";
import auth from "../../Helpers/auth";
import "./_food-order.scss";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AntdTable from "../../Components/Tables/AntdTable";
import {
  createOrderForAnyCustomer,
  getFoodData,
  mutationCreateOrder,
} from "./helper";
import { calcCartTotal } from "../../Components/Pages/Home/HomeBody/helper";
import { getPrice } from "../../Helpers";
import AnyCustomerModal from "../../Components/Modals/AnyCustomerModal";
import InputCT from "../../Components/Inputs/InputCT";

const FoodOrder = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    foodData: getFoodData(location.state),
    anyCustomerVisible: false,
    notes: "",
  });
  const { className } = props;
  const { foodData, anyCustomerVisible, notes } = state;
  useEffect(() => {}, []);
  const { total } = calcCartTotal(location.state);
  const { address, phone, email } = auth.getDataLogin();
  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const generateColumns = () => {
    const columns = [
      {
        title: "No.",
        dataIndex: "index",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (cell) => getPrice(cell, undefined, ""),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
    ];
    return columns;
  };

  const orderAnyCustomer = async (anyCustomerData = {}) => {
    setState({ loading: true });
    const res = await createOrderForAnyCustomer(foodData, anyCustomerData);
    const obj = { loading: false };
    if (res.isSuccess) {
      alert("Successfully creating order!");
      auth.setFoodData(undefined);
      _.assign(obj, { anyCustomerVisible: false });
      setTimeout(() => {
        history.push("/retail-store");
      }, 300);
    } else {
      alert("Failed to create order: ", res.message);
    }
    setState(obj);
  };

  const onClickBack = () => {
    history.push("/retail-store");
  };

  const onClickCancel = () => {
    setState({ anyCustomerVisible: !anyCustomerVisible });
  };

  const onClickConfirm = async () => {
    if (!address || !phone || !email) {
      setState({ anyCustomerVisible: true });
      return;
    }
    setState({ loading: true });
    const res = await mutationCreateOrder(foodData, email, notes);
    if (res.isSuccess) {
      alert("Successfully creating order!");
      auth.setFoodData(undefined);
      history.push("/retail-store");
    } else {
      alert("Failed to create order: ", res.message);
    }
    setState({ loading: false });
  };

  return (
    <div className={classnames("food-order", className)}>
      <HomeHeader></HomeHeader>
      <div className="food-order-body">
        <div className="food-order-body-toper">
          <div className="flex">
            <span className="b">Payment Options:</span>
            <span className="ml-4">Cash - When receiving</span>
          </div>
          <div className="flex">
            <span className="b">Total:</span>
            <span className="ml-4">{getPrice(total, undefined, "")}</span>
          </div>
        </div>
        <div className="food-order-body-toper">
          <div className="flex">
            <span className="b">Delivery:</span>
            <span className="ml-4">{address}</span>
          </div>
          <div className="flex">
            <span className="b">Contact at:</span>
            <span className="ml-4">{phone}</span>
          </div>
        </div>
        {email && (
          <InputCT
            titleClassName="b"
            title="Notes"
            name="notes"
            value={notes}
            onChange={onChange}
            placeholder="Enter your notes"
            className="mt-16"
            type="TEXTAREA"
          />
        )}
        <div className="food-order-body-btns">
          <Button onClick={onClickBack}>Back</Button>
          <Button type="primary" onClick={onClickConfirm}>
            Confirm
          </Button>
        </div>
        <AntdTable
          className="mt-48"
          rowKey="id"
          totalData={foodData}
          columns={generateColumns()}
        ></AntdTable>
      </div>

      <AnyCustomerModal
        visible={anyCustomerVisible}
        onClickCancel={onClickCancel}
        onClick={orderAnyCustomer}
      ></AnyCustomerModal>
    </div>
  );
};
FoodOrder.defaultProps = {
  className: "",
};
FoodOrder.propTypes = {
  className: PropTypes.string,
};

export default FoodOrder;
