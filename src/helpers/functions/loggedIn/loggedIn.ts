import { get, isEmpty, isString } from "lodash";

const loggedIn = (): boolean => {
  if (isEmpty(localStorage)) return false;
  const storage = JSON.parse(
    localStorage.getItem("persist:yammpay-storage") || "",
  );
  if (!storage) return false;
  const auth = storage?.consumerAuth;
  if (!auth) return false;
  const token = get(isString(auth) ? JSON.parse(auth) : auth, "token.value");
  return Boolean(token);
};

export default loggedIn;
