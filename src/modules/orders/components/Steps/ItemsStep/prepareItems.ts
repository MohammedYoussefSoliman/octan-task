import { OrderPackage, PackageItem, OrderItems } from './itemsStep.types';

const prepareOrderItem = (item: PackageItem, packages: OrderPackage[]) => {
  let noPackages: PackageItem[] = [];

  const hasPackage = Boolean(item.details.store_package);

  if (!hasPackage) {
    noPackages = [item];
  }

  const { store_package: itemStorePackage } = item.details;

  const foundStorePackage = packages.find(
    (pack) => pack.id === itemStorePackage?.id,
  );

  if (foundStorePackage) {
    foundStorePackage.items.push(item);
  } else if (hasPackage) {
    packages.push({
      type: 'package',
      ...itemStorePackage,
      items: [item],
    });
  }

  return {
    noPackages,
    packages,
  };
};

const prepareItems = (
  items: PackageItem[],
  preparedItems: OrderItems = [],
): OrderItems => {
  if (items.length <= 0) {
    return preparedItems;
  }

  const itemToMap = items[0];

  const packageItems = preparedItems.filter(
    (i) => i.type === 'package',
  ) as OrderPackage[];
  const noPackageItems = preparedItems.filter((i) => i.type === 'item');

  const { noPackages, packages } = prepareOrderItem(itemToMap, packageItems);

  const orderItems = [...packages, ...noPackageItems, ...noPackages];

  return prepareItems(items.slice(1), orderItems);
};

export default prepareItems;
