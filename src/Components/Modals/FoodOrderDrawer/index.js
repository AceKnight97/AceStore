import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import classnames from "classnames";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { STATUS_ENUM } from "../../../Constants/home";
import { getPrice } from "../../../Helpers";
import { useMergeState } from "../../../Helpers/customHooks";
import RadioCT from "../../Inputs/RadioCT";
import { mutationChangeStatus } from "./helper";
import "./_food-order-drawer.scss";

const FoodOrderDrawer = (props) => {
  const [state, setState] = useMergeState({
    loading: false,
  });
  const { visible, className, data, onClose, onUpdateFoodOrder } = props;
  const { date, status, foodOrderId, notes } = data;
  const { loading } = state;

  const onChangeStatus = async (key, value) => {
    console.log({ key, value, foodOrderId });
    if (!foodOrderId || !value) {
      return;
    }
    setState({ loading: true });
    try {
      const res = await mutationChangeStatus(foodOrderId, value);
      if (res.isSuccess) {
        onUpdateFoodOrder(_.assign(props.data, { status: value }));
      }
      setState({ loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };

  return (
    <Drawer
      title="Food order"
      placement="right"
      width={400}
      closeIcon={<CloseOutlined className="color-gray-9" />}
      onClose={onClose}
      visible={visible}
      className="food-order-drawer"
      maskClosable={false}
    >
      <div className={classnames("food-order-drawer-wrapper", className)}>
        <div className="food-order-drawer-created-at">
          <span className="b mr-4">Created at: </span>
          <span>{moment(date).format("HH:mm, DD/MM/YY")}</span>
        </div>
        <div className="food-order-drawer-total">
          <span className="b mr-4">Total: </span>
          <span>{data.total || ""}</span>
        </div>

        <RadioCT
          data={STATUS_ENUM}
          value={status}
          title="Status:"
          titleClassName="b pos-re"
          className="mt-16 mb-16"
          onChange={onChangeStatus}
          loading={loading}
          disabled={!props.isEditable}
        ></RadioCT>

        <div className="mt-16">
          <span className="b">Food list: </span>
        </div>
        {_.map(data.data || [], (x, i) => (
          <div key={i} className="food-order-drawer-row">
            {`${i + 1}: ${x.name} - Price: ${getPrice(
              x.price,
              undefined,
              ""
            )} - Quantity: ${x.quantity}`}
          </div>
        ))}
        <div className="food-order-drawer-total">
          <span className="b mr-4">Notes: </span>
          <span>{data.notes || ""}</span>
        </div>
      </div>
    </Drawer>
  );
};
FoodOrderDrawer.defaultProps = {
  className: "",
  data: {},
  visible: false,
  toggleClick: () => {},
  onClose: () => {},
  onUpdateFoodOrder: () => {},
  isEditable: true,
};
FoodOrderDrawer.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
  toggleClick: PropTypes.func,
  onClose: PropTypes.func,
  onUpdateFoodOrder: PropTypes.func,
  visible: PropTypes.bool,
  isEditable: PropTypes.bool,
};

export default FoodOrderDrawer;
