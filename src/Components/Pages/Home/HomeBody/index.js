import { Tag } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../../../Helpers/auth";
import { useMergeState } from "../../../../Helpers/customHooks";
import Loading from "../../../UI/Loading";
import FilterBlock from "../FilterBlock";
import FoodTable from "../FoodTable";
import HomeTotal from "../HomeTotal";
import { calcCartTotal, getFoodMasterData, handleFilterFood } from "./helper";

const HomeBody = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    foodData: auth.getFoodData().length !== 0 ? auth.getFoodData() : [], //_.cloneDeep([MOCKING_FOOD_TABLE])
    arrImages: [],
    loading: true,
    rawFoodData: auth.getFoodData().length !== 0 ? auth.getFoodData() : [], //_.cloneDeep([MOCKING_FOOD_TABLE])
  });

  const fetchMenuData = async () => {
    try {
      const foodData = (await getFoodMasterData()) || [];
      setState({ foodData, rawFoodData: foodData, loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };

  useEffect(() => {
    if (auth.getFoodData().length !== 0) {
      setState({ loading: false });
      return;
    }
    fetchMenuData();
  }, []);

  const { className } = props;
  const { foodData, loading } = state;

  const { cartTags, total } = calcCartTotal(foodData);

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
    console.log({ item });
    const { data } = _.find(foodData, (x) => x.title === title);
    const cardTemp = _.find(data, (x) => x.name === item.name);
    _.assign(cardTemp, { ...item });
    console.log({ foodData });
    auth.setFoodData(foodData);
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
      <FilterBlock onFilterFood={onFilterFood}></FilterBlock>
      <HomeTotal
        className="home-body-toper-block-3"
        total={total}
        onClickReset={onClickReset}
        onClickBuy={onClickBuy}
      />
    </div>
  );

  // console.log({ foodData });

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
