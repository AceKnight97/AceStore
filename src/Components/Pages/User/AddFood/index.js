import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Button } from "antd";
import "./_add-food.scss";
import { useMergeState } from "../../../../Helpers/customHooks";
import InputCT from "../../../Inputs/InputCT";
import starIc from "../../../../Images/Pages/Home/star.svg";
import starInactiveIc from "../../../../Images/Pages/Home/star-inactive.svg";
import InputTitle from "../../../Inputs/InputTitle";
import SelectCT from "../../../Inputs/SelectCT";
import { QUANTITY_TYPES_ADD_FOOD } from "../../../../Constants/home";
import { CloseOutlined } from "@ant-design/icons";

const DEFAULT_DATA = {
  imgSrc: undefined,
  name: "",
  nameErr: "",
  price: "",
  priceErr: "",
  title: "",
  titleErr: "",
  rating: 1,
  quanityType: undefined,
  quanityTypeErr: "",
};

const AddFood = (props) => {
  const [state, setState] = useMergeState({
    ...DEFAULT_DATA,
  });
  const { className, index, onChangeFood, onDeleteFood } = props;

  const onChangeStar = (rating = 1) => {
    if (rating !== state.rating) {
      setState({ rating });
      return;
    }
  };

  const onClickReset = () => {
    setState({ ...DEFAULT_DATA });
    onChangeFood(index, {});
  };

  const {
    imgSrc,
    name,
    nameErr,
    price,
    priceErr,
    title,
    titleErr,
    rating,
    quanityType,
    quanityTypeErr,
  } = state;

  useEffect(() => {
    if (name && price && title && rating && quanityType) {
      //imgSrc &&
      onChangeFood(index, { imgSrc, name, price, title, rating, quanityType });
    }
  }, [imgSrc, name, price, title, rating, quanityType]);

  const onChange = (key, value) => {
    // console.log({ key, value });
    setState({
      [key]: value,
      nameErr: "",
      priceErr: "",
      titleErr: "",
      quanityTypeErr: "",
    });
  };

  const onClickDelete = () => {
    onDeleteFood(index);
  };

  return (
    <div className={classnames("add-food", className)}>
      <div className="add-food-row">
        <div className="">
          {imgSrc ? (
            <img src={imgSrc} alt="Food card img" className="food-card-img" />
          ) : (
            <div className="food-card-img" />
          )}
          <InputCT
            className="mt-16"
            title="Food name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            errMes={nameErr}
          />
        </div>

        <div className="add-food-name-price">
          <div className="fr-sb">
            <Button danger onClick={onClickReset}>
              Reset
            </Button>
            {index !== 0 && (
              <Button onClick={onClickDelete}>
                <CloseOutlined />
              </Button>
            )}
          </div>
          <SelectCT
            className="mt-16"
            title="Kind of quanity"
            name="quanityType"
            value={quanityType}
            onChange={onChange}
            placeholder="Enter your quanity"
            errMes={quanityTypeErr}
            data={QUANTITY_TYPES_ADD_FOOD}
          />
          <InputCT
            className="mt-16"
            title="Food price"
            name="price"
            value={price}
            onChange={onChange}
            placeholder="Enter your price"
            errMes={priceErr}
            type="NUMBER"
          />
          <InputCT
            className="mt-16"
            title="Food title"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter your title"
            errMes={titleErr}
          />
          <InputTitle title="Rating" className="mt-16" />

          <div className="flex">
            {_.map(_.range(rating), (x, i) => (
              <button
                className="bas-btn"
                key={x}
                onClick={() => onChangeStar(i + 1)}
              >
                <img src={starIc} alt="Star ic" />
              </button>
            ))}
            {_.map(_.range(5 - rating), (x, i) => (
              <button
                className="bas-btn"
                key={x}
                onClick={() => onChangeStar(rating + i + 1)}
              >
                <img src={starInactiveIc} alt="Star inactive ic" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
AddFood.defaultProps = {
  className: "",
  index: 0,
  data: {},
  onChangeFood: () => {},
  onDeleteFood: () => {},
};
AddFood.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  data: PropTypes.shape(),
  onChangeFood: PropTypes.func,
  onDeleteFood: PropTypes.func,
};

export default AddFood;
