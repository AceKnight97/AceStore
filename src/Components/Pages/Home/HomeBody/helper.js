import { QUANTITY_TYPES } from "../../../../Constants/home";
import _ from "lodash";
import fetchMenu from "../../../../Apollo/Functions/Fetch/fetchMenu";
import auth from "../../../../Helpers/auth";

export const getFoodMasterData = async () => {
  try {
    const res = await fetchMenu();
    auth.setMenu(res);
    const titles = [];
    const foodData = [];
    const grouped = _.groupBy(res, (x) => x.title);
    Object.keys(grouped).forEach((x) => {
      titles.push(x);
      foodData.push({
        title: x,
        data: grouped[x],
      });
    });
    auth.setKindOfFood(titles);
    return foodData;
  } catch (error) {
    throw error;
  }
};

export const calcCartTotal = (foodData = []) => {
  let total = 0;
  const cartTags = [];
  _.forEach(foodData, (x) => {
    total += _.sumBy(x.data, (z) => {
      if (z.isBuy) {
        // console.log({ z })
        if (z.quantityType === QUANTITY_TYPES.WEIGHT) {
          // console.log({ a: quantity, z, z1: z.quantity })
          const quantity = z.quantity.slice(0, 3);
          cartTags.push(`${z.name} (${z.price} * ${quantity})`);
          return parseFloat(quantity) * z.price;
        }
        // console.log({ b: quantity })
        const quantity = z.quantity.slice(0, 1);
        cartTags.push(`${z.name} (${z.price} * ${quantity})`);
        return parseInt(quantity, 10) * z.price;
      }
      return 0;
    });
    // _.forEach(x.data, y => {
    //   if (y.isBuy) {
    //   }
    // })
  });
  // console.log({ foodData, total, cartTags });
  return { total, cartTags };
};

export const handleFilterFood = (filterObject = {}, foodData = []) => {
  // console.log({ filterObject, foodData });
  const { searchName, rating, kind, minPrice, maxPrice } = filterObject;
  console.log({ searchName, rating, kind, minPrice, maxPrice });
  let newFoodata = _.cloneDeep(foodData);
  _.forEach(newFoodata, (x) => {
    x.data = _.filter(x.data, (y) => {
      let condition = true;
      if (kind) {
        // console.log("kind");
        condition = y.title === kind;
      }
      if (!_.isNil(rating) && !_.isNil(y.rating)) {
        // console.log("rating");
        condition = condition && y.rating >= rating;
      }
      if (searchName) {
        // console.log("searchName");
        condition =
          condition && y.name?.toLowerCase().includes(searchName.toLowerCase());
      }
      if (!_.isNil(minPrice)) {
        // console.log("minPrice");
        condition = condition && y.price >= minPrice;
      }
      if (!_.isNil(maxPrice)) {
        // console.log("maxPrice");
        condition = condition && y.price <= maxPrice;
      }
      return condition;
    });
  });
  // console.log({ newFoodata, foodData });

  return newFoodata;
};
