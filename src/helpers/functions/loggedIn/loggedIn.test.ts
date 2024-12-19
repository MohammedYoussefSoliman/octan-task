import getLocalStorageMock from "./mocked-localstorage";

import loggedIn from "./loggedIn";

const mockStorage = {
  consumerAuth: {
    token: {
      value: "some token",
    },
  },
  mode: "light",
};

const window = {
  localStorage: getLocalStorageMock(),
};

global.window = window as any;

describe("loggedIn", () => {
  beforeEach(() => {
    localStorage.setItem(
      "persist:yammpay-storage",
      JSON.stringify(mockStorage),
    );
  });

  it("it should return true when token value exists", () => {
    loggedIn.bind(this);
    expect(loggedIn()).toBeTruthy();
  });
  it("it should return false when no auth excites on localStorage", () => {
    localStorage.setItem(
      "persist:yammpay-storage",
      JSON.stringify({
        mode: "light",
      }),
    );
    expect(loggedIn()).toBeFalsy();
  });
  it("it should return false when no token excites on auth", () => {
    localStorage.setItem(
      "persist:yammpay-storage",
      JSON.stringify({
        consumerAuth: {
          role: "consumer",
        },
        mode: "light",
      }),
    );
    expect(loggedIn()).toBeFalsy();
  });
  it("it should return false when no local storage exists", () => {
    localStorage.clear();
    expect(loggedIn()).toBeFalsy();
  });
});
