import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Tag } from "antd";
import { useMergeState } from "../../../../Helpers/customHooks";
import InforBlock from "../InforBlock";
import HomeTotal from "../HomeTotal";
import { FOOD_NAMES, MOCKING_FOOD_TABLE } from "../../../../Constants/home";
import FoodTable from "../FoodTable";
import { calcCartTotal } from "./helper";

const ace = FOOD_NAMES;

const HomeBody = (props) => {
  const [state, setState] = useMergeState({
    name: "asd",
    phone: "",
    address: "",
    notes: "",

    // cartTags: [],
    foodData: _.cloneDeep(MOCKING_FOOD_TABLE),
  });
  const { className } = props;
  const {
    name,
    phone,
    address,
    notes, // total, // cartTags,
    foodData,
  } = state;
  console.log({ foodData });
  const { cartTags, total } = calcCartTotal(foodData);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickReset = () => {
    console.log({ onClickReset: foodData });
    setState({ foodData: _.cloneDeep(MOCKING_FOOD_TABLE) });
  };

  const onClickBuy = () => {};

  const onChangeCart = (item = {}, title = "") => {
    // console.log({ item, title });
    const { data } = _.find(foodData, (x) => x.title === title);
    const cardTemp = _.find(data, (x) => x.name === item.name);
    _.assign(cardTemp, { ...item });
    // console.log({ foodData })
    setState({ foodData });
  };

  const renderToper = () => (
    <div className="home-body-toper">
      <InforBlock
        name1="name"
        value1={name}
        title1="Name:"
        name2="phone"
        value2={phone}
        title2="Phone number:"
        onChange={onChange}
        className="home-body-toper-block-1"
        type="NAME_PHONE"
      />
      <InforBlock
        name1="address"
        value1={address}
        title1="Address:"
        name2="notes"
        value2={notes}
        title2="Notes:"
        onChange={onChange}
        className="home-body-toper-block-2"
        type="ADDRESS_NOTES"
      />
      <HomeTotal
        className="home-body-toper-block-3"
        total={total}
        onClickReset={onClickReset}
        onClickBuy={onClickBuy}
      />
    </div>
  );

  return (
    <div className={classnames("home-body", className)}>
      {renderToper()}

      <div className="home-body-main">
        {cartTags.length !== 0 && (
          <div className="home-body-cart-tag">
            <div className="home-body-cart-tag-title">
              <span>Your cart:</span>
            </div>

            {_.map(cartTags, (x, i) => (
              <Tag key={i} className="home-body-cart-tag-item" color="orange">
                {x}
              </Tag>
            ))}
          </div>
        )}

        {_.map(foodData, (x, i) => (
          <FoodTable
            key={i}
            title={x.title}
            data={x.data}
            onChangeCart={onChangeCart}
          />
        ))}
      </div>
    </div>
  );
};
HomeBody.defaultProps = {
  className: "",
};
HomeBody.propTypes = {
  className: PropTypes.string,
};

export default HomeBody;
