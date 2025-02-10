const GetStorage = (name: string) => {
  return localStorage.getItem(name) || "";
};

const setStorage = (name: string, item: any) => {
  localStorage.setItem(name, item);
};

const DeleteStorage = (name: string) => {
  localStorage.removeItem(name);
};

export { DeleteStorage, setStorage, GetStorage };
