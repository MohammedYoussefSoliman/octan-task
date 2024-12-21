const prepareItemsObject = (items: any[]) => {
  let obj = {};

  items.forEach((item, index) => {
    obj = {
      ...obj,
      [`items[${index}][product_id]`]: item.product_id,
      [`items[${index}][reason_id]`]: item.reason_id,
      [`items[${index}][quantity]`]: item.quantity,
    };
  });
  return obj;
};

export default prepareItemsObject;
