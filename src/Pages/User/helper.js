export const a = "";

export const checkDisabledFoodList = (foodList = []) => {
  if (!foodList || foodList?.length === 0 || !foodList[0]) {
    return true;
  }
  const res = _.find(
    foodList,
    (x) => !x || !x.name || !x.price || !x.title || !x.quanityType // || !x.imgSrc
  );
  return !!res;
};
