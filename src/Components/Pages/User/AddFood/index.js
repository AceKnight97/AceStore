import { CloseOutlined, FileImageTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import {
  QUANTITY_TYPES,
  QUANTITY_TYPES_ADD_FOOD,
} from "../../../../Constants/home";
import auth from "../../../../Helpers/auth";
import {
  useMergeState,
  useUpdateEffect,
} from "../../../../Helpers/customHooks";
import InputCT from "../../../Inputs/InputCT";
import InputTitle from "../../../Inputs/InputTitle";
import SelectCT from "../../../Inputs/SelectCT";
import DisplayRating from "../../../UI/DisplayRating";
import "./_add-food.scss";

const DEFAULT_DATA = {
  image: undefined,
  name: "",
  nameErr: "",
  price: "",
  id: "",
  priceErr: "",
  title: "",
  titleErr: "",
  rating: 1,
  quantityType: undefined,
  quanityTypeErr: "",
  displayingName: undefined,
};

const AddFood = (props) => {
  const menuRef = useRef([]);
  const [state, setState] = useMergeState({
    ...DEFAULT_DATA,
  });

  const { className, index, onChangeFood, onDeleteFood, type } = props;

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
    image,
    name,
    nameErr,
    price,
    priceErr,
    title,
    titleErr,
    rating,
    quantityType,
    quanityTypeErr,
    displayingName,
    id,
  } = state;

  const inputId = `${type}-img-id-${index}`;
  const isAdd = type === "ADD";

  useEffect(() => {
    if (!isAdd) {
      menuRef.current = auth.getMenu();
    }
  }, []);

  useEffect(() => {
    const item = _.find(
      menuRef.current,
      (x) => x.title + "." + x.name === displayingName
    );
    // console.log({ item });
    if (!_.isEmpty(item)) {
      setState({
        ...item,
        quantityType:
          QUANTITY_TYPES_ADD_FOOD[
            item.quantityType === QUANTITY_TYPES.WEIGHT ? 0 : 1
          ],
      });
    }
  }, [displayingName]);

  useEffect(() => {
    onChangeFood(index, {
      image,
      name,
      price,
      title,
      rating,
      quantityType,
      displayingName,
      id,
    });
  }, [image, name, price, title, rating, quantityType, displayingName]);

  const onChange = (key, value) => {
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

  const onChangeImg = async (event = {}) => {
    const file = event?.target?.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const img = reader.result;
      setState({ image: img });
    };
  };

  const onClickImg = () => {
    const e = document.getElementById(inputId);
    // console.log({ e });
    if (e) {
      e.click();
    }
  };

  return (
    <div className={classnames("add-food", className)}>
      {!isAdd && (
        <SelectCT
          title="Food"
          name="displayingName"
          value={displayingName}
          onChange={onChange}
          placeholder="Select food name"
          data={_.map(auth.getMenu(), (x) => x.title + "." + x.name)}
          className="mb-16"
        />
      )}
      <div className="add-food-row">
        <div className="">
          {image ? (
            <img
              src={image}
              alt="Food card img"
              className="food-card-img"
              onClick={onClickImg}
            />
          ) : (
            <div className="food-card-img" onClick={onClickImg}>
              <FileImageTwoTone />
              <div className="food-card-img-text">
                <span>Upload image</span>
              </div>
            </div>
          )}
          <input
            id={inputId}
            type="file"
            onChange={onChangeImg}
            className="dis-none"
            accept="image/png, .jpeg, .jpg, .webp"
          ></input>
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
            name="quantityType"
            value={quantityType}
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
            title="Kind of food"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter kind of food"
            errMes={titleErr}
          />
          <InputTitle title="Rating" className="mt-16" />

          <DisplayRating
            rating={rating}
            isButton
            onClick={onChangeStar}
          ></DisplayRating>
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
  type: "ADD",
};
AddFood.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  data: PropTypes.shape(),
  onChangeFood: PropTypes.func,
  onDeleteFood: PropTypes.func,
  type: PropTypes.string,
};

export default AddFood;
