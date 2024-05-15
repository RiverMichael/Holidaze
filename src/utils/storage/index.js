export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const load = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const clear = () => {
  localStorage.clear();
};
