/* eslint-disable prettier/prettier */

// Service de gestion des tokens JWT
class TokenService {
  // Clés pour le localStorage
  static ACCESS_TOKEN_KEY = 'accessToken';
  static REFRESH_TOKEN_KEY = 'refreshToken';
  static USER_KEY = 'user';

  // Sauvegarder les tokens
  static setTokens(accessToken, refreshToken) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // Récupérer le token d'accès
  static getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Récupérer le refresh token
  static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Sauvegarder les informations utilisateur
  static setUser(user) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Récupérer les informations utilisateur
  static getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Vérifier si l'utilisateur est connecté
  static isAuthenticated() {
    return !!this.getAccessToken();
  }

  // Supprimer tous les tokens et données utilisateur
  static clearTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Vérifier si le token est expiré
  static isTokenExpired(token) {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Décoder le token JWT pour obtenir les informations
  static decodeToken(token) {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }
}

export default TokenService;
