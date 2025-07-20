/* eslint-disable prettier/prettier */

export const putInLocalStorage = (variableName, variable) => {
  localStorage.setItem(variableName, JSON.stringify(variable));
};

export const getValueLocalStorage = (variableName) => {
  return JSON.parse(localStorage.getItem(variableName));
};

export const purgeStorage = (variableName) => {
  if (variableName === undefined) {
    localStorage.clear();
  } else {
    localStorage.removeItem(variableName);
  }
  return true;
};

export const getCurrentPath = () => {
  return window.location.pathname;
  //   return pathname.split('/').pop();
};
