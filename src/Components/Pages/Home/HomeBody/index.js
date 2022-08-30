import { Tag } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../../../Helpers/auth";
import { useMergeState } from "../../../../Helpers/customHooks";
import { getFormatedData } from "../../../../temp";
import Loading from "../../../UI/Loading";
import FilterBlock from "../FilterBlock";
import FoodTable from "../FoodTable";
import { calcCartTotal, getFoodMasterData, handleFilterFood } from "./helper";
import "./_home-body.scss";

const HomeBody = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    foodData: [],
    arrImages: [],
    rawFoodData: [],
    loading: true,
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
    auth.setIsOrderHere(false);
    if (auth.getFoodData().length !== 0) {
      const foodData = auth.getFoodData();
      setState({ loading: false, foodData, rawFoodData: [...foodData] });
      return;
    }
    fetchMenuData();

    getFormatedData();
  }, []);

  const { className } = props;
  const { foodData, loading } = state;

  const { cartTags, total } = calcCartTotal(foodData);

  const onClickReset = () => {
    const newFoodData = [...foodData];
    newFoodData.forEach((x) => {
      (x.data || []).forEach((y) => {
        Object.assign(y, { isBuy: false });
      });
    });
    auth.setFoodData(undefined);
    setState({ foodData: newFoodData });
  };

  const onClickBuy = (isOrderHere = false) => {
    history.push({
      pathname: "/food-order",
      state: foodData,
    });
    auth.setIsOrderHere(isOrderHere);
    auth.setFoodData(foodData);
  };

  const onChangeCart = (item = {}, title = "") => {
    const { data } = foodData.find((x) => x.title === title);
    const cardTemp = data.find((x) => x.name === item.name);
    Object.assign(cardTemp, { ...item });
    auth.setFoodData(foodData);
    setState({ foodData });
  };

  const onFilterFood = (filterObject = {}) => {
    setState({ foodData: [], loading: true });
    setTimeout(() => {
      const newFoodata = handleFilterFood(filterObject, state.rawFoodData);
      setState({ foodData: [...newFoodata], loading: false });
    }, 400);
  };

  return (
    <>
      <div className={classnames("home-body", className)}>
        <FilterBlock
          onFilterFood={onFilterFood}
          total={total}
          onClickReset={onClickReset}
          onClickBuy={onClickBuy}
        ></FilterBlock>

        <div className="home-body-main">
          {cartTags.length !== 0 && (
            <div className="home-body-cart-tag animation-fadein-2s">
              <div className="home-body-cart-tag-title">
                <span>Your cart:</span>
              </div>

              {cartTags.map((x, i) => (
                <Tag key={i} className="home-body-cart-tag-item" color="orange">
                  {x}
                </Tag>
              ))}
            </div>
          )}

          {foodData.map(
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
    </>
  );
};
HomeBody.defaultProps = {
  className: "",
};
HomeBody.propTypes = {
  className: PropTypes.string,
};

export default HomeBody;
