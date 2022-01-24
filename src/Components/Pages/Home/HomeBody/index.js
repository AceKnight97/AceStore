import { Tag } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../../../Helpers/auth";
import { useMergeState } from "../../../../Helpers/customHooks";
import testimg1 from "../../../../Images/Foods/1.webp";
import testimg10 from "../../../../Images/Foods/10.jpg";
import testimg11 from "../../../../Images/Foods/11.png";
import testimg12 from "../../../../Images/Foods/12.webp";
import testimg13 from "../../../../Images/Foods/13.webp";
import testimg2 from "../../../../Images/Foods/2.webp";
import testimg3 from "../../../../Images/Foods/3.webp";
import testimg4 from "../../../../Images/Foods/4.webp";
import testimg5 from "../../../../Images/Foods/5.jpg";
import testimg6 from "../../../../Images/Foods/6.jpg";
import testimg7 from "../../../../Images/Foods/7.webp";
import testimg8 from "../../../../Images/Foods/8.jpg";
import testimg9 from "../../../../Images/Foods/9.webp";
import FilterBlock from "../FilterBlock";
import FoodTable from "../FoodTable";
import HomeTotal from "../HomeTotal";
import { calcCartTotal, getFoodMasterData, handleFilterFood } from "./helper";
import Loading from "../../../UI/Loading";

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
    foodData: auth.getFoodData().length !== 0 ? auth.getFoodData() : [], //_.cloneDeep([MOCKING_FOOD_TABLE])
    arrImages: [],
    loading: true,
    rawFoodData: auth.getFoodData().length !== 0 ? auth.getFoodData() : [], //_.cloneDeep([MOCKING_FOOD_TABLE])
  });
  const fetchMasterData = async () => {
    try {
      const foodData = await getFoodMasterData();
      // console.log({ foodData });
      auth.setMasterData(foodData);
      setState({ foodData, rawFoodData: foodData, loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };

  useEffect(() => {
    fetchMasterData();
    // const arrImages = [];
    // arr.forEach((e) => {
    //   toDataURL(e, function (dataUrl) {
    //     arrImages.push(dataUrl);
    //   });
    // });
    // setTimeout(() => {
    //   // console.log({ arrImages });
    //   setState({ arrImages });
    // }, 500);
  }, []);
  const { className } = props;
  const {
    name,
    phone,
    address,
    notes, // total, // cartTags,
    foodData,
    loading,
  } = state;

  const { cartTags, total } = calcCartTotal(foodData);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const onClickReset = () => {
    const newFoodData = _.cloneDeep(foodData);
    _.forEach(newFoodData, (x) => {
      _.forEach(x.data || [], (y) => {
        _.assign(y, { isBuy: false });
      });
    });
    auth.setFoodData(undefined);
    setState({ foodData: newFoodData });
  };

  const onClickBuy = () => {
    history.push({
      pathname: "/food-order",
      state: foodData,
    });
    auth.setFoodData(foodData);
  };

  const onChangeCart = (item = {}, title = "") => {
    const { data } = _.find(foodData, (x) => x.title === title);
    const cardTemp = _.find(data, (x) => x.name === item.name);
    _.assign(cardTemp, { ...item });
    setState({ foodData });
  };

  const onFilterFood = (filterObject = {}) => {
    setState({ foodData: [] });
    setTimeout(() => {
      const newFoodata = handleFilterFood(filterObject, state.rawFoodData);
      // console.log({ newFoodata });
      setState({ foodData: _.cloneDeep(newFoodata) });
    }, 1);
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
      <FilterBlock onFilterFood={onFilterFood}></FilterBlock>
      <HomeTotal
        className="home-body-toper-block-3"
        total={total}
        onClickReset={onClickReset}
        onClickBuy={onClickBuy}
      />
    </div>
  );

  return (
    <div>
      <div className={classnames("home-body", className)}>
        {renderToper()}

        <div className="home-body-main">
          {cartTags.length !== 0 && (
            <div className="home-body-cart-tag animation-fadein-2s">
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

          {_.map(
            foodData,
            (x, i) =>
              x.data.length !== 0 &&
              x.title && (
                <FoodTable
                  className="animation-fadein-2s"
                  key={i}
                  title={x.title}
                  data={x.data}
                  onChangeCart={onChangeCart}
                  isShow={i === 0}
                />
              )
          )}
        </div>
      </div>
      {loading && <Loading></Loading>}
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
