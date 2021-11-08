import currencyFormatter from 'currency-formatter';


export const temp = '';



export const getPrice = (value = 0, unit = 'VND', text = 'Price:') => {
  let temp = '';
  switch (unit) {
    case 'VND':
      temp = currencyFormatter.format(value, { code: 'VND' });
      break;
    default:
      break;
  }
  return `${text} ${temp}`;
}