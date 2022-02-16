import _ from "lodash";
import handleAddFood from "../../Apollo/Functions/Handle/handleAddFood";
import handleDeleteFood from "../../Apollo/Functions/Handle/handleDeleteFood";
import handleUpdateFood from "../../Apollo/Functions/Handle/handleUpdateFood";
import { QUANTITY_TYPES, QUANTITY_TYPES_ADD_FOOD } from "../../Constants/home";

const formatFood = (x = {}, id = null) => {
  const quantityType =
    x.quantityType === QUANTITY_TYPES_ADD_FOOD[0]
      ? QUANTITY_TYPES.WEIGHT
      : QUANTITY_TYPES.PACKAGE;
  const obj = {
    title: x.title,
    name: x.name,
    rating: x.rating,
    price: parseFloat(x.price),
    quantityType,
    image: x.image,
  };
  if (id) {
    _.assign(obj, { id });
  }
  return obj;
};

export const handleMutationAddFood = async (food = [], type = "ADD") => {
  const isAdd = type === "ADD";
  const isEdit = type === "EDIT";
  console.log({ food });
  const sendingData = {};
  switch (type) {
    case "ADD":
    case "EDIT":
      _.assign(sendingData, {
        input: _.map(food, (x) => formatFood(x, isAdd ? null : x.id)),
      });
      break;
    default:
      _.assign(sendingData, { input: _.map(food, (x) => x.id) });
      break;
  }
  console.log({ sendingData });
  try {
    const func = isAdd
      ? handleAddFood
      : isEdit
      ? handleUpdateFood
      : handleDeleteFood;
    const res = await func(sendingData);
    return res;
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

export const checkDisabledFoodList = (foodList = [], isDelete = false) => {
  if (!foodList || foodList?.length === 0 || !foodList[0]) {
    return true;
  }
  const res = _.find(
    foodList,
    (x) =>
      !x ||
      !x.name ||
      !x.price ||
      !x.title ||
      !x.quantityType ||
      (!x.image && !isDelete)
  );
  // console.log({ res });
  return !!res;
};
