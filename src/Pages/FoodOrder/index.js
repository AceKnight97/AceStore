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
import { getFoodData, mutationCreateOrder } from "./helper";
import { calcCartTotal } from "../../Components/Pages/Home/HomeBody/helper";
import { getPrice } from "../../Helpers";

const FoodOrder = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    foodData: getFoodData(location.state),
  });
  const { className } = props;
  const { foodData } = state;
  useEffect(() => {}, []);
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  const { total } = calcCartTotal(location.state);
  const { address, phone, email } = auth.getDataLogin();
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

  const onClickBack = () => {
    history.push("/home");
  };
  const onClickConfirm = async () => {
    setState({ loading: true });
    const res = await mutationCreateOrder(foodData, email);
    // if (res.isSuccess) {
    // } else {
    // }
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
        <div className="food-order-body-btns">
          <Button onClick={onClickBack}>Back</Button>
          <Button type="primary" onClick={onClickConfirm}>
            Confirm
          </Button>
        </div>
        <AntdTable
          className="mt-48"
          rowKey="index"
          totalData={foodData}
          columns={generateColumns()}
        ></AntdTable>
      </div>
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
