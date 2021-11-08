import { QUANTITY_TYPES } from "../../../../Constants/home";

export const temp = '';


export const calcCartTotal = (foodData = []) => {
  let total = 0;
  const cartTags = [];
  _.forEach(foodData, x => {
    total += _.sumBy(x.data, z => {
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
}