import { QUANTITY_TYPES } from "../../../../Constants/home";
import _ from "lodash";
import fetchMenu from "../../../../Apollo/Functions/Fetch/fetchMenu";
import auth from "../../../../Helpers/auth";
// import testimg1 from "../../../../Images/Foods/1.webp";
// import testimg10 from "../../../../Images/Foods/10.jpg";
// import testimg11 from "../../../../Images/Foods/11.png";
// import testimg12 from "../../../../Images/Foods/12.webp";
// import testimg13 from "../../../../Images/Foods/13.webp";
// import testimg2 from "../../../../Images/Foods/2.webp";
// import testimg3 from "../../../../Images/Foods/3.webp";
// import testimg4 from "../../../../Images/Foods/4.webp";
// import testimg5 from "../../../../Images/Foods/5.jpg";
// import testimg6 from "../../../../Images/Foods/6.jpg";
// import testimg7 from "../../../../Images/Foods/7.webp";
// import testimg8 from "../../../../Images/Foods/8.jpg";
// import testimg9 from "../../../../Images/Foods/9.webp";

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
    auth.setMasterData(foodData);
    auth.setFoodData(undefined);
    return foodData;
  } catch (error) {
    throw error;
  }
};

const calWeight = (z = {}, cartTags = []) => {
  const quantity = z.quantity.slice(0, 3);
  const res = parseFloat(quantity) * z.price;
  if (res > 0) {
    cartTags.push(`${z.name} (${z.price} * ${quantity})`);
  }
  return res;
};

const calPackage = (z = {}, cartTags) => {
  const quantity = z.quantity.slice(0, 1);
  const res = parseFloat(quantity) * z.price;
  if (res > 0) {
    cartTags.push(`${z.name} (${z.price} * ${quantity})`);
  }
  return res;
};

export const calcCartTotal = (foodData = []) => {
  let total = 0;
  const cartTags = [];
  _.forEach(foodData, (x) => {
    total += _.sumBy(x.data, (z) => {
      if (z.isBuy) {
        return calPackage(z, cartTags) || calWeight(z, cartTags);
      }
      return 0;
    });
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

// const arr = [
//   testimg1,
//   testimg2,
//   testimg3,
//   testimg4,
//   testimg5,
//   testimg6,
//   testimg7,
//   testimg8,
//   testimg9,
//   testimg10,
//   testimg11,
//   testimg12,
//   testimg13,
// ];
export const testUpdateBase64 = () => {
  // const arrImages = [];
  // arr.forEach((e) => {
  //   toDataURL(e, function (dataUrl) {
  //     arrImages.push(dataUrl);
  //   });
  // });
  // setTimeout(() => {
  //   // console.log({ arrImages });
  //   setState({ arrImages });
  // }, 500);
};
