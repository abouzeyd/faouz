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

export const formatGlobalDate = (date) => {
  // const rawDate = "2025-07-23 08:41:14.0";
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  const formatted = date ? `${day}/${month}/${year}` : '';
  return formatted;
};
