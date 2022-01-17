import _ from "lodash";
import handleAddFood from "../../Apollo/Functions/Handle/handleAddFood";
import { QUANTITY_TYPES, QUANTITY_TYPES_ADD_FOOD } from "../../Constants/home";
import auth from "../../Helpers/auth";

export const handleMutationAddFood = async (food = []) => {
  const sendingData = {
    email: auth.getDataLogin()?.email || "",
    food: _.map(food, (x) => ({
      title: x.title,
      name: x.name,
      rating: x.rating,
      price: parseFloat(x.price),
      quantityType:
        x.quantityType === QUANTITY_TYPES_ADD_FOOD[0]
          ? QUANTITY_TYPES.WEIGHT
          : QUANTITY_TYPES.PACKAGE,
      image: x.image,
    })),
  };
  console.log({ sendingData });
  const res = await handleAddFood(sendingData);
  return res;
};

export const checkDisabledFoodList = (foodList = []) => {
  if (!foodList || foodList?.length === 0 || !foodList[0]) {
    return true;
  }
  const res = _.find(
    foodList,
    (x) => !x || !x.name || !x.price || !x.title || !x.quanityType // || !x.image
  );
  // console.log({ res });
  return !!res;
};
