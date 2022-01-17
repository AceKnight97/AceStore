import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {
  PACKAGE_DATA,
  QUANTITY_TYPES,
  WEIGHT_DATA,
} from "../../../../Constants/home";
import { getPrice } from "../../../../Helpers";
import {
  useMergeState,
  useUpdateEffect,
} from "../../../../Helpers/customHooks";
import SelectCT from "../../../Inputs/SelectCT";
import FoodInfoModal from "../../../Modals/FoodInfoModal";
import DisplayRating from "../../../UI/DisplayRating";
import "./_food-card.scss";

const FoodCard = (props) => {
  const [state, setState] = useMergeState({
    name: props.name,
    price: props.price,
    rating: props.rating,
    isBuy: props.isBuy,
    quantity:
      props.quantity || props.quantityType === QUANTITY_TYPES.WEIGHT
        ? WEIGHT_DATA[0]
        : PACKAGE_DATA[0],
    quantityType: props.quantityType,
    visibleFoodInfo: false,
  });
  const { className, quantityType, image, unit, onChangeCart } = props;
  const { name, price, rating, isBuy, quantity, visibleFoodInfo } = state;

  useUpdateEffect(() => {
    onChangeCart(state);
  }, [isBuy, quantity]);

  useUpdateEffect(() => {
    setState({ isBuy: props.isBuy });
  }, [props.isBuy]);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const toggleIsBuy = () => {
    setState({ isBuy: !isBuy });
  };

  const toggleVisibleFoodInfo = () => {
    setState({ visibleFoodInfo: !visibleFoodInfo });
  };

  // console.log({ title });
  if (!props.title || props.title === "null") {
    console.log({ rating });
  }
  return (
    <div>
      <div
        className={classnames(
          "food-card",
          isBuy && "food-card-active",
          className
        )}
      >
        {image ? (
          <div className="food-card-img" onClick={toggleIsBuy}>
            <img
              src={image}
              alt="Food card img"
              className="food-card-img-dis"
            ></img>
            {/*
          
          <img
            src={image}
            alt="Food card img"
            className="food-card-img-child"
          ></img>*/}
          </div>
        ) : (
          <div className="food-card-img" onClick={toggleIsBuy} />
        )}

        <div className="food-card-info">
          <div className="food-card-info-name">{name}</div>

          <div className="fr-sb">
            <div className="food-card-info-col">
              <div className="food-card-info-col-price">
                {getPrice(price, unit)}
              </div>
              <SelectCT
                disabled={!isBuy}
                name="quantity"
                showSearch={false}
                className="mt-4"
                value={quantity}
                onChange={onChange}
                data={
                  quantityType === QUANTITY_TYPES.WEIGHT
                    ? WEIGHT_DATA
                    : PACKAGE_DATA
                }
              />
            </div>

            <div className="food-card-info-col">
              <DisplayRating
                rating={rating}
                className="food-card-info-col-rating"
              ></DisplayRating>

              <Button className="mt-10" onClick={toggleVisibleFoodInfo}>
                More info
              </Button>

              {/*
              <CheckboxCT
                name="isBuy"
                data="Buy"
                isCheck={isBuy}
                onChange={onChange}
                className="mt-4"
              />
              */}
            </div>
          </div>
        </div>

        {isBuy && <div className="food-card-isbuy">Buy</div>}
      </div>

      <FoodInfoModal
        visible={visibleFoodInfo}
        toggleClick={toggleVisibleFoodInfo}
        data={{ name, rating, price, image }}
      ></FoodInfoModal>
    </div>
  );
};
FoodCard.defaultProps = {
  className: "",
  name: "",
  price: 0,
  rating: 3,
  isBuy: false,
  quantity: undefined,
  quantityType: QUANTITY_TYPES.WEIGHT,
  image: "",
  unit: "VND",
  onChangeCart: () => {},
};
FoodCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  isBuy: PropTypes.bool,
  quantity: PropTypes.string,
  quantityType: PropTypes.string,
  image: PropTypes.string,
  unit: PropTypes.string,
  onChangeCart: PropTypes.func,
};

export default FoodCard;
