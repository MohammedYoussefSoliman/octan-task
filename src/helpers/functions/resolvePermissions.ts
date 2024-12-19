/* eslint-disable @typescript-eslint/no-explicit-any */
export default function resolvePermissions(permissions: string[]) {
  if (permissions.length <= 0) return {};
  const permissionRoles = ['orders', 'invoices', 'admin'];

  let userPermissions: any = {};

  permissions.forEach((permission) => {
    const permissionRoleArr = permission.split('-');

    if (!permissionRoles.includes(permissionRoleArr[0])) return;
    let foundRole = {
      view: false,
      update: false,
      delete: false,
      create: false,
    };
    if (permissionRoleArr[0] === 'admin') {
      foundRole = { view: true, update: true, delete: true, create: true };
    }
    if (userPermissions[permissionRoleArr[0]]) {
      if (permissionRoleArr[0] === 'admin') {
        foundRole = { view: true, update: true, delete: true, create: true };
      } else {
        foundRole = { ...userPermissions[permissionRoleArr[0]] };
      }
    }
    const normalPermission =
      permissionRoleArr[0] !== 'admin' ? { [permissionRoleArr[1]]: true } : {};
    userPermissions = {
      ...userPermissions,
      [permissionRoleArr[0]]: {
        ...foundRole,
        ...normalPermission,
      },
    };
  });

  return userPermissions;
}
