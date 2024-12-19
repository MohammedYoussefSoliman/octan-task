type Store = { [key: string]: string };

class LocalStorageMock {
  store: Store | null;

  length: number;

  constructor() {
    this.length = 0;
    this.store = {};
  }

  key(n: number): any {
    if (typeof n === "undefined") {
      throw new Error(
        "Uncaught TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.",
      );
    }

    if (n >= Object.keys(this.store as any).length) {
      return null;
    }

    return Object.keys(this.store as any)[n];
  }

  getItem(key: string): Store | null {
    if (!Object.keys(this.store as any).includes(key)) {
      return null;
    }
    return (this.store as any)[key as string];
  }

  setItem(key: string, value: string): undefined {
    if (typeof key === "undefined" && typeof value === "undefined") {
      throw new Error(
        "Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 0 present.",
      );
    }

    if (typeof value === "undefined") {
      throw new Error(
        "Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 1 present.",
      );
    }

    if (!key) return undefined;

    (this.store as any)[key] = value.toString() || "";
    this.length = Object.keys(this.store as any).length;

    return undefined;
  }

  removeItem(key: string): undefined {
    if (typeof key === "undefined") {
      throw new Error(
        "Uncaught TypeError: Failed to execute 'removeItem' on 'Storage': 1 argument required, but only 0 present.",
      );
    }

    delete (this.store as any)[key];
    this.length = Object.keys(this.store as any).length;
    return undefined;
  }

  clear(): undefined {
    this.store = {};
    this.length = 0;

    return undefined;
  }
}

const getLocalStorageMock = (): LocalStorageMock => {
  return new LocalStorageMock();
};

export default getLocalStorageMock;
