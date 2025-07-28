/* eslint-disable prettier/prettier */

export const putInLocalStorage = (variableName, variable) => {
  localStorage?.setItem(variableName, JSON?.stringify(variable) || null);
};

export const getValueLocalStorage = (variableName) => {
  if (!variableName) return null;

  const rawValue = localStorage?.getItem(variableName);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch (e) {
    console.error('Erreur JSON.parse pour', variableName, ':', e);
    return null;
  }
};

// export const getValueLocalStorage = (variableName) => {
//   storage = variableName !== null || variableName !== undefined ? JSON?.parse(localStorage?.getItem(variableName)) : null;
//   return storage;
// };

export const purgeStorage = (variableName) => {
  if (variableName === undefined) {
    localStorage?.clear();
  } else {
    localStorage?.removeItem(variableName);
  }
  return true;
};

export const getCurrentPath = () => {
  return window.location.pathname;
  //   return pathname.split('/').pop();
};
