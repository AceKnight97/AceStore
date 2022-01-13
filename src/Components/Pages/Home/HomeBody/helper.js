import { QUANTITY_TYPES } from "../../../../Constants/home";
import _ from "lodash";
import fetchMenu from "../../../../Apollo/Functions/Fetch/fetchMenu";

export const getMasterData = async () => {
  const res = await fetchMenu();
  const foodData = [];
  // _.forEach(res, (x) => {
  //   const data = []
  //   foodData.push({});
  // });
  // const grouped = _.mapValues(_.groupBy(res, "title"), (clist) =>
  //   clist.map((res) => _.omit(res, "title"))
  // );

  const grouped = _.groupBy(res, (car) => car.title);

  Object.keys(grouped).forEach((x) => {
    foodData.push({
      title: x,
      data: grouped[x],
    });
  });

  console.log({ grouped, foodData });
  return foodData;
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
