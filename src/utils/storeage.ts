export const setItemToSesstion = (name: string, data: string) => {
  sessionStorage.setItem(name, data);
};

export const getItemToSesstion = (name: string) => sessionStorage.getItem(name);
