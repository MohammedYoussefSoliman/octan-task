/* eslint-disable @typescript-eslint/no-explicit-any */
const prepareItemsObject = (items: any[]) => {
  let obj = {};

  items.forEach((item, index) => {
    let files = {};
    if (item.files && item.files.length > 0) {
      (item.files as any[]).forEach((file, fileIndex) => {
        files = {
          ...files,
          [`items[${index}][files][${fileIndex}]`]: file.id,
        };
      });
    }

    const baseObject = {
      ...obj,
      [`items[${index}][product_id]`]: item.product_id,
      [`items[${index}][reason_id]`]: item.reason_id,
      [`items[${index}][quantity]`]: item.quantity,
      // [`items[${index}][files]`]: [...item?.files],
      [`items[${index}][customer_return_reason_text]`]: item.requiredText,
      ...files,
    };

    if (item.variant_id) {
      obj = {
        ...baseObject,
        [`items[${index}][variant_id]`]: item.variant_id,
      };
    } else {
      obj = {
        ...baseObject,
      };
    }
  });
  return obj;
};

export default prepareItemsObject;
