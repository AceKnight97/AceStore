import { CloseOutlined, FileImageTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { QUANTITY_TYPES_ADD_FOOD } from "../../../../Constants/home";
import { useMergeState } from "../../../../Helpers/customHooks";
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
    image,
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
    onChangeFood(index, { image, name, price, title, rating, quanityType });
  }, [image, name, price, title, rating, quanityType]);

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

  // const onChangeImgCrop = async ({ fileList = [] }) => {
  //   console.log({ fileList });
  //   if (fileList && fileList[0]?.originFileObj) {
  //   }
  // };

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
    const e = document.getElementById("img-id");
    console.log({ e });
    if (e) {
      e.click();
    }
  };

  return (
    <div className={classnames("add-food", className)}>
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
            id="img-id"
            type="file"
            onChange={onChangeImg}
            className="dis-none"
            accept="image/png, .jpeg, .jpg, .webp"
          ></input>

          {/*   <ImgCrop shape="round">
            <Upload
              onChange={onChangeImgCrop}
              itemRender={() => null}
              accept="image/png, .jpeg, .jpg"
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              action="/api/upload_file"
              showUploadList={{ showPreviewIcon: false }}
              listType="picture"
            >
              {image ? (
                <img
                  src={image}
                  alt="Food card img"
                  className="food-card-img"
                  // onClick={onClickImg}
                />
              ) : (
                <div
                  className="food-card-img"
                  // onClick={onClickImg}
                >
                  <FileImageTwoTone />
                  <div className="food-card-img-text">
                    <span>Upload image</span>
                  </div>
                </div>
              )}
            </Upload>
          </ImgCrop> */}
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
};
AddFood.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  data: PropTypes.shape(),
  onChangeFood: PropTypes.func,
  onDeleteFood: PropTypes.func,
};

export default AddFood;
