import axios from 'axios';

const authServer = axios.create({
  baseURL: 'http://localhost:8081',
});

export default class AuthService {
  public static getAccesToken() {
    return window.localStorage.getItem('accesToken');
  }

  public static setAccesToken(token: string) {
    return window.localStorage.setItem('acessToken', token);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }

  public static setRefreshToken(token: string) {
    return window.localStorage.setItem('refreshToken', token);
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem('codeVerifier');
  }

  public static setCodeVerifier(codeVerifier: string) {
    return window.localStorage.setItem('codeVerifier', codeVerifier);
  }
}
