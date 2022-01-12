import React, { useEffect, useMemo } from "react";
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
import { toDataURL } from "../../../../Helpers";
import FilterBlock from "../FilterBlock";
import testimg1 from "../../../../Images/Foods/1.webp";
import testimg2 from "../../../../Images/Foods/2.webp";
import testimg3 from "../../../../Images/Foods/3.webp";
import testimg4 from "../../../../Images/Foods/4.webp";
import testimg5 from "../../../../Images/Foods/5.jpg";
import testimg6 from "../../../../Images/Foods/6.jpg";
import testimg7 from "../../../../Images/Foods/7.webp";
import testimg8 from "../../../../Images/Foods/8.jpg";
import testimg9 from "../../../../Images/Foods/9.webp";
import testimg10 from "../../../../Images/Foods/10.jpg";
import testimg11 from "../../../../Images/Foods/11.png";
import testimg12 from "../../../../Images/Foods/12.webp";
import testimg13 from "../../../../Images/Foods/13.webp";
import auth from "../../../../Helpers/auth";
import { useHistory } from "react-router-dom";

const arr = [
  testimg1,
  testimg2,
  testimg3,
  testimg4,
  testimg5,
  testimg6,
  testimg7,
  testimg8,
  testimg9,
  testimg10,
  testimg11,
  testimg12,
  testimg13,
];
const HomeBody = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    name: "",
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
  useEffect(async () => {
    const urlArr = [];
    arr.forEach((e) => {
      toDataURL(e, function (dataUrl) {
        urlArr.push(dataUrl);
      });
    });
    setTimeout(() => {
      console.log({ urlArr });
    }, 500);
  }, []);

  const { cartTags, total } = calcCartTotal(foodData);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickReset = () => {
    const test = auth.getDataLogin();
    console.log({ onClickReset: foodData, test });
    setState({ foodData: _.cloneDeep(MOCKING_FOOD_TABLE) });
  };

  const onClickBuy = () => {
    history.push("/food-order");
  };

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
      {/*  <InforBlock
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
     */}
      <FilterBlock></FilterBlock>
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
            isShow={i === 0}
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
