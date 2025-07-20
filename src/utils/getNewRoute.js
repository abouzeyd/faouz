/* eslint-disable prettier/prettier */

export const getNewRoute = (value, username, password) => {
  if (username === '' || password === '') {
    console.error("Nom d'utilisateur et mot de passe sont requis");
    return;
  }
  console.log({ password });

  // if (password.length > 10) {
  //   console.error('Password must be less than 10 characters');
  //   return;
  // }
  if (password !== password.trim()) {
    console.error('Le mot de passe ne peut pas commencer ou finir par des espaces');
    return;
  }

  if (username !== 'mohou') {
    console.error("Nom d'utilisateur incorrect");
    return;
  }
  if (password !== '12345') {
    // setPassword('Mot de passe incorrect');
    return;
  }
};
