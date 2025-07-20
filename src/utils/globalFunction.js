/* eslint-disable prettier/prettier */
export const filterSaerch = (data, valeur) => {
  data.filter((data) => data.nom.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));
};
