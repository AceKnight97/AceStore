import _ from "lodash";
import handleAddFood from "../../Apollo/Functions/Handle/handleAddFood";
import handleUpdateFood from "../../Apollo/Functions/Handle/handleUpdateFood";
import { QUANTITY_TYPES, QUANTITY_TYPES_ADD_FOOD } from "../../Constants/home";
import auth from "../../Helpers/auth";

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

export const handleMutationAddFood = async (food = [], isAdd = false) => {
  console.log({ food });
  const sendingData = {
    input: _.map(food, (x) => formatFood(x, isAdd ? null : x.id)),
  };
  console.log({ sendingData });
  try {
    const func = isAdd ? handleAddFood : handleUpdateFood;
    const res = await func(sendingData);
    return res;
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

export const checkDisabledFoodList = (foodList = []) => {
  if (!foodList || foodList?.length === 0 || !foodList[0]) {
    return true;
  }
  const res = _.find(
    foodList,
    (x) => !x || !x.name || !x.price || !x.title || !x.quantityType // || !x.image
  );
  // console.log({ res });
  return !!res;
};
